/**
 * F-4E A2G Procedures - HBUI Interface Bridge
 *
 * Provides communication between the HTML overlay and DCS/Lua
 * via Heatblur's hb_send_proxy mechanism.
 *
 * When running outside DCS (standalone browser), provides
 * fallback behavior for development and testing.
 */

var HBInterface = (function () {
  'use strict';

  // Detect if running inside HBUI (DCS) or standalone browser
  var isInDCS = typeof hb_send_proxy === 'function';

  /**
   * Send a command to the C++/Lua backend via HBUI bridge
   * @param {string} command - Command identifier
   * @param {*} data - Payload data (will be serialized)
   */
  function send(command, data) {
    if (isInDCS) {
      try {
        hb_send_proxy(JSON.stringify({
          type: 'a2g_procedures',
          command: command,
          data: data || null
        }));
      } catch (e) {
        console.warn('[A2G] hb_send_proxy error:', e);
      }
    } else {
      // Development fallback - log to console
      console.log('[A2G] Command:', command, 'Data:', data);
    }
  }

  /**
   * Send an event notification
   * @param {string} eventName - Event name
   * @param {*} payload - Event data
   */
  function sendEvent(eventName, payload) {
    send('event', { name: eventName, payload: payload });
  }

  /**
   * Notify backend that a mode was selected
   * @param {string} modeId - The selected mode identifier
   */
  function notifyModeSelected(modeId) {
    send('mode_selected', { mode: modeId });
  }

  /**
   * Notify backend that overlay should close
   */
  function notifyClose() {
    send('close', null);
  }

  /**
   * Request the backend to have Jester read a procedure aloud
   * @param {string} modeId - Which mode's procedure to read
   * @param {string} section - 'setup', 'execution', or 'notes'
   */
  function requestVoiceReadout(modeId, section) {
    send('voice_readout', { mode: modeId, section: section });
  }

  // Public API
  return {
    isInDCS: isInDCS,
    send: send,
    sendEvent: sendEvent,
    notifyModeSelected: notifyModeSelected,
    notifyClose: notifyClose,
    requestVoiceReadout: requestVoiceReadout
  };
})();
