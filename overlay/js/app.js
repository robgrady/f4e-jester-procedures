/**
 * F-4E A2G Procedures - Application Logic
 * Renders procedure cards, handles navigation and checklist interaction
 */

(function () {
  'use strict';

  // ---- State ----
  let activeMode = null;
  let checklistState = {}; // { "dive_toss_setup_1": true, ... }

  // ---- DOM References ----
  const modeTabs     = document.getElementById('mode-tabs');
  const cardHeader   = document.getElementById('card-header');
  const cardTitle    = document.getElementById('card-title');
  const cardBadge    = document.getElementById('card-mode-badge');
  const cardDesc     = document.getElementById('card-description');
  const cardKnob     = document.getElementById('card-delivery-knob');
  const diagramSec   = document.getElementById('diagram-section');
  const diagramCont  = document.getElementById('diagram-container');
  const profileParams= document.getElementById('profile-params');
  const setupSec     = document.getElementById('setup-section');
  const setupBody    = document.getElementById('setup-body');
  const resetSetup   = document.getElementById('reset-setup');
  const execSec      = document.getElementById('execution-section');
  const execList     = document.getElementById('execution-list');
  const resetExec    = document.getElementById('reset-exec');
  const wrcsSec      = document.getElementById('wrcs-section');
  const wrcsSettings = document.getElementById('wrcs-settings');
  const notesSec     = document.getElementById('notes-section');
  const notesList    = document.getElementById('notes-list');
  const comingSoon   = document.getElementById('coming-soon');
  const comingSoonTitle = document.getElementById('coming-soon-title');
  const comingSoonDesc  = document.getElementById('coming-soon-desc');

  // ---- Initialize ----
  function init() {
    buildNavTabs();
    bindEvents();
    // Default to Dive Toss
    selectMode('dive_toss');
  }

  // ---- Navigation Tabs ----
  function buildNavTabs() {
    modeTabs.innerHTML = '';
    MODE_ORDER.forEach(function (modeId) {
      // Handle divider sentinels (__a2a_divider__, __gen_divider__, etc.)
      if (modeId.charAt(0) === '_' && modeId.charAt(1) === '_') {
        var divider = document.createElement('div');
        divider.className = 'nav-divider';
        modeTabs.appendChild(divider);
        return;
      }

      var proc = PROCEDURES[modeId];
      if (!proc) return;

      var tab = document.createElement('button');
      tab.className = 'nav-tab';
      tab.textContent = proc.shortName || proc.name;
      tab.dataset.mode = modeId;
      tab.title = proc.name;

      if (proc.comingSoon) {
        tab.classList.add('disabled');
      }

      tab.addEventListener('click', function () {
        if (!proc.comingSoon) {
          selectMode(modeId);
        }
      });

      modeTabs.appendChild(tab);
    });
  }

  function updateActiveTab(modeId) {
    var tabs = modeTabs.querySelectorAll('.nav-tab');
    tabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.mode === modeId);
    });
  }

  // ---- Mode Selection ----
  function selectMode(modeId) {
    var proc = PROCEDURES[modeId];
    if (!proc) return;

    activeMode = modeId;
    updateActiveTab(modeId);

    if (proc.comingSoon) {
      showComingSoon(proc);
    } else {
      hideComingSoon();
      renderCard(proc);
    }

    // Notify HBUI if available
    if (typeof HBInterface !== 'undefined' && HBInterface.sendEvent) {
      HBInterface.sendEvent('mode_selected', modeId);
    }
  }

  // ---- Coming Soon ----
  function showComingSoon(proc) {
    hideCardSections();
    comingSoon.style.display = '';
    comingSoonTitle.textContent = proc.name;
    comingSoonDesc.textContent = proc.description || '';
  }

  function hideComingSoon() {
    comingSoon.style.display = 'none';
  }

  function hideCardSections() {
    cardHeader.style.display = 'none';
    diagramSec.style.display = 'none';
    setupSec.style.display = 'none';
    execSec.style.display = 'none';
    wrcsSec.style.display = 'none';
    notesSec.style.display = 'none';
  }

  function showCardSections() {
    cardHeader.style.display = '';
    diagramSec.style.display = '';
    setupSec.style.display = '';
    execSec.style.display = '';
    wrcsSec.style.display = '';
    notesSec.style.display = '';
  }

  // ---- Render Full Card ----
  function renderCard(proc) {
    showCardSections();

    // Header
    cardBadge.textContent = proc.category;
    cardTitle.textContent = proc.name;
    cardDesc.textContent = proc.description;
    cardKnob.textContent = proc.deliveryKnobPosition
      ? 'Delivery Mode Knob: ' + proc.deliveryKnobPosition
      : '';

    // Dynamic section headings for non-combat procedures
    var diagramHeading = diagramSec.querySelector('.section-heading');
    var execHeading = execSec.querySelector('.section-heading');
    if (proc.sectionLabels) {
      if (proc.sectionLabels.diagram) diagramHeading.textContent = proc.sectionLabels.diagram;
      if (proc.sectionLabels.execution) execHeading.childNodes[0].textContent = proc.sectionLabels.execution;
    } else {
      diagramHeading.textContent = 'ATTACK PROFILE';
      execHeading.childNodes[0].textContent = 'ATTACK PROCEDURE';
    }

    // Diagram
    renderDiagram(proc);

    // Setup checklist
    renderSetupChecklist(proc);

    // Execution procedure
    renderExecution(proc);

    // WRCS Settings
    renderWRCS(proc);

    // Notes
    renderNotes(proc);
  }

  // ---- Diagram ----
  function renderDiagram(proc) {
    if (!proc.diagram) {
      diagramSec.style.display = 'none';
      return;
    }

    // Load SVG via fetch for inline rendering
    diagramCont.innerHTML = '<span style="color:#b8956a;font-size:0.8rem;">Loading diagram...</span>';

    fetch(proc.diagram)
      .then(function (resp) { return resp.text(); })
      .then(function (svgText) {
        diagramCont.innerHTML = svgText;
      })
      .catch(function () {
        // Fallback: use img tag
        diagramCont.innerHTML = '<img src="' + proc.diagram + '" alt="' + proc.name + ' Attack Profile">';
      });

    // Attack profile parameters
    profileParams.innerHTML = '';
    if (proc.attackProfile) {
      var ap = proc.attackProfile;
      var params = [
        // A2G params
        { label: 'DIVE ANGLE',      value: ap.typicalDiveAngle },
        { label: 'ENTRY ALT',       value: ap.typicalAltitude },
        { label: 'ENTRY SPEED',     value: ap.typicalSpeed },
        { label: 'RELEASE ALT',     value: ap.releaseAltitude },
        { label: 'MIN PULLOUT ALT', value: ap.minPulloutAlt },
        // A2A params
        { label: 'ENGAGEMENT RNG',  value: ap.engagementRange },
        { label: 'GUIDANCE',        value: ap.guidanceType },
        { label: 'RADAR MODE',      value: ap.radarMode },
        { label: 'SEEKER TYPE',     value: ap.seekerType },
        // General procedure params
        { label: 'START TYPE',      value: ap.startType },
        { label: 'GROUND POWER',    value: ap.groundPower },
        { label: 'START TIME',      value: ap.startTime },
        { label: 'ALIGN TIME',      value: ap.alignmentTime },
        { label: 'POSITION ACC',    value: ap.positionAccuracy },
        { label: 'TACAN RANGE',     value: ap.tacanRange },
        { label: 'APPROACH SPD',    value: ap.approachSpeed },
        { label: 'APPROACH AOA',    value: ap.approachAoA },
        { label: 'TDWN SPEED',      value: ap.touchdownSpeed }
      ];

      params.forEach(function (p) {
        if (!p.value) return;
        var div = document.createElement('div');
        div.className = 'profile-param';
        div.innerHTML =
          '<div class="profile-param-label">' + escapeHtml(p.label) + '</div>' +
          '<div class="profile-param-value">' + escapeHtml(p.value) + '</div>';
        profileParams.appendChild(div);
      });
    }
  }

  // ---- Setup Checklist ----
  function renderSetupChecklist(proc) {
    if (!proc.setup || proc.setup.length === 0) {
      setupSec.style.display = 'none';
      return;
    }

    setupBody.innerHTML = '';
    proc.setup.forEach(function (item) {
      var key = activeMode + '_setup_' + item.step;
      var isChecked = !!checklistState[key];

      var tr = document.createElement('tr');
      tr.className = isChecked ? 'checked' : '';
      tr.dataset.key = key;

      var sysColor = SYSTEM_COLORS[item.system] || { bg: '#556b2f', fg: '#fff' };

      // Solo pilot note for WSO-crewed setup steps
      var pilotNoteHtml = '';
      if (item.crew === 'WSO' && typeof SOLO_PILOT_NOTES !== 'undefined') {
        var soloNote = item.pilotNote || SOLO_PILOT_NOTES[item.system] || '';
        if (soloNote) {
          pilotNoteHtml = '<div class="pilot-note">SOLO: ' + escapeHtml(soloNote) + '</div>';
        }
      }

      tr.innerHTML =
        '<td class="col-check">' +
          '<span class="check-box' + (isChecked ? ' checked' : '') + '" data-key="' + key + '">' +
            (isChecked ? '&#10003;' : '') +
          '</span>' +
        '</td>' +
        '<td class="col-step">' + item.step + '</td>' +
        '<td class="col-system">' +
          '<span class="sys-badge" style="background:' + sysColor.bg + ';color:' + sysColor.fg + ';">' +
            escapeHtml(item.system) +
          '</span>' +
        '</td>' +
        '<td class="col-action">' + escapeHtml(item.action) + pilotNoteHtml + '</td>' +
        '<td class="col-setting"><strong>' + escapeHtml(item.setting) + '</strong></td>' +
        '<td class="col-crew">' +
          '<span class="crew-badge ' + (item.crew || '').toLowerCase() + '">' +
            escapeHtml(item.crew || '') +
          '</span>' +
        '</td>';

      setupBody.appendChild(tr);
    });
  }

  // ---- Execution Procedure ----
  function renderExecution(proc) {
    if (!proc.execution || proc.execution.length === 0) {
      execSec.style.display = 'none';
      return;
    }

    execList.innerHTML = '';
    proc.execution.forEach(function (item) {
      var key = activeMode + '_exec_' + item.step;
      var isChecked = !!checklistState[key];

      var phaseColor = PHASE_COLORS[item.phase] || { bg: '#556b2f', fg: '#fff' };

      // Solo pilot note for WSO-crewed execution steps
      var pilotNoteHtml = '';
      if (item.crew === 'WSO' && item.pilotNote) {
        pilotNoteHtml = '<div class="pilot-note">SOLO: ' + escapeHtml(item.pilotNote) + '</div>';
      }

      var li = document.createElement('li');
      li.className = 'execution-item' + (isChecked ? ' checked' : '');
      li.dataset.key = key;

      li.innerHTML =
        '<span class="exec-check">' +
          '<span class="check-box' + (isChecked ? ' checked' : '') + '" data-key="' + key + '">' +
            (isChecked ? '&#10003;' : '') +
          '</span>' +
        '</span>' +
        '<span class="exec-num">' + item.step + '</span>' +
        '<span class="exec-phase" style="background:' + phaseColor.bg + ';color:' + phaseColor.fg + ';">' +
          escapeHtml(item.phase || '') +
        '</span>' +
        '<span class="exec-text">' + escapeHtml(item.action) + pilotNoteHtml + '</span>' +
        '<span class="exec-crew">' +
          '<span class="crew-badge ' + (item.crew || '').toLowerCase() + '">' +
            escapeHtml(item.crew || '') +
          '</span>' +
        '</span>';

      execList.appendChild(li);
    });
  }

  // ---- WRCS / ARBCS Settings ----
  function renderWRCS(proc) {
    // Merge wrcsSettings, arbcsSettings, and radarSettings into one display
    var combined = {};
    if (proc.wrcsSettings) {
      Object.keys(proc.wrcsSettings).forEach(function (k) { combined[k] = proc.wrcsSettings[k]; });
    }
    if (proc.arbcsSettings) {
      Object.keys(proc.arbcsSettings).forEach(function (k) { combined[k] = proc.arbcsSettings[k]; });
    }
    if (proc.radarSettings) {
      Object.keys(proc.radarSettings).forEach(function (k) { combined[k] = proc.radarSettings[k]; });
    }
    if (proc.insSettings) {
      Object.keys(proc.insSettings).forEach(function (k) { combined[k] = proc.insSettings[k]; });
    }
    if (proc.approachSettings) {
      Object.keys(proc.approachSettings).forEach(function (k) { combined[k] = proc.approachSettings[k]; });
    }

    if (Object.keys(combined).length === 0) {
      wrcsSec.style.display = 'none';
      return;
    }

    // Update heading based on what's present
    var headingEl = wrcsSec.querySelector('.section-heading');
    if (headingEl) {
      var headingText = proc.insSettings ? 'INS / NAVIGATION SETTINGS'
        : proc.approachSettings ? 'APPROACH SETTINGS'
        : proc.radarSettings ? 'RADAR / FIRE CONTROL SETTINGS'
        : proc.wrcsSettings && proc.arbcsSettings ? 'WRCS / ARBCS SETTINGS'
        : proc.arbcsSettings ? 'ARBCS SETTINGS'
        : 'WRCS SETTINGS';
      headingEl.childNodes[0].textContent = headingText;
    }

    wrcsSettings.innerHTML = '';
    var settings = combined;

    Object.keys(settings).forEach(function (key) {
      var s = settings[key];
      var card = document.createElement('div');
      card.className = 'setting-card';

      var html =
        '<div class="setting-label">' + escapeHtml(s.label) + '</div>' +
        '<div class="setting-range">Range: ' + escapeHtml(s.range) + '</div>';

      if (s.formula) {
        html += '<div class="setting-formula">' + escapeHtml(s.formula) + '</div>';
        if (s.formulaDesc) {
          html += '<div class="setting-formula-desc">' + escapeHtml(s.formulaDesc) + '</div>';
        }
      }

      html += '<div class="setting-desc">' + escapeHtml(s.description) + '</div>';

      if (s.crew) {
        html += '<div class="setting-crew">OPERATED BY: ' + escapeHtml(s.crew) + '</div>';
        if (s.crew === 'WSO') {
          html += '<div class="pilot-note" style="margin-top:0.3rem;">SOLO: Set via Jester menu or rear cockpit</div>';
        }
      }

      card.innerHTML = html;
      wrcsSettings.appendChild(card);
    });
  }

  // ---- Notes ----
  function renderNotes(proc) {
    if (!proc.notes || proc.notes.length === 0) {
      notesSec.style.display = 'none';
      return;
    }

    notesList.innerHTML = '';
    proc.notes.forEach(function (note) {
      var div = document.createElement('div');
      div.className = 'note-item ' + (note.type || 'info');

      div.innerHTML =
        '<span class="note-prefix ' + (note.type || 'info') + '">' +
          escapeHtml((note.type || 'info').toUpperCase()) + ':' +
        '</span>' +
        escapeHtml(note.text);

      notesList.appendChild(div);
    });
  }

  // ---- Checklist Toggle ----
  function toggleCheck(key) {
    checklistState[key] = !checklistState[key];

    // Update checkbox visual
    var boxes = document.querySelectorAll('.check-box[data-key="' + key + '"]');
    boxes.forEach(function (box) {
      box.classList.toggle('checked', checklistState[key]);
      box.innerHTML = checklistState[key] ? '&#10003;' : '';
    });

    // Update row/item visual
    var rows = document.querySelectorAll('[data-key="' + key + '"]');
    rows.forEach(function (row) {
      if (row.tagName === 'TR' || row.tagName === 'LI') {
        row.classList.toggle('checked', checklistState[key]);
      }
    });
  }

  function resetChecks(prefix) {
    Object.keys(checklistState).forEach(function (key) {
      if (key.indexOf(prefix) === 0) {
        checklistState[key] = false;
      }
    });
    // Re-render active card
    if (activeMode) {
      selectMode(activeMode);
    }
  }

  // ---- Events ----
  function bindEvents() {
    // Delegate checkbox clicks
    document.addEventListener('click', function (e) {
      var checkBox = e.target.closest('.check-box');
      if (checkBox && checkBox.dataset.key) {
        toggleCheck(checkBox.dataset.key);
        return;
      }

      // Also allow clicking the row/item to toggle
      var row = e.target.closest('tr[data-key], li[data-key]');
      if (row && row.dataset.key && !e.target.closest('.check-box')) {
        toggleCheck(row.dataset.key);
      }
    });

    // Reset buttons
    resetSetup.addEventListener('click', function () {
      resetChecks(activeMode + '_setup_');
    });

    resetExec.addEventListener('click', function () {
      resetChecks(activeMode + '_exec_');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // Left/Right arrows for mode navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        navigateMode(e.key === 'ArrowRight' ? 1 : -1);
        e.preventDefault();
      }
      // Escape to close (for HBUI overlay)
      if (e.key === 'Escape') {
        if (typeof HBInterface !== 'undefined' && HBInterface.sendEvent) {
          HBInterface.sendEvent('close_overlay');
        }
      }
    });
  }

  function navigateMode(direction) {
    var availableModes = MODE_ORDER.filter(function (id) {
      return !(id.charAt(0) === '_' && id.charAt(1) === '_') && PROCEDURES[id] && !PROCEDURES[id].comingSoon;
    });

    var idx = availableModes.indexOf(activeMode);
    if (idx === -1) return;

    var next = idx + direction;
    if (next >= 0 && next < availableModes.length) {
      selectMode(availableModes[next]);
    }
  }

  // ---- Utility ----
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Public API (for HBUI integration) ----
  window.A2GProcedures = {
    selectMode: selectMode,
    getActiveMode: function () { return activeMode; },
    resetAll: function () {
      checklistState = {};
      if (activeMode) selectMode(activeMode);
    }
  };

  // ---- Boot ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
