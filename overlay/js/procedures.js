/**
 * F-4E Phantom II - Procedure Data
 * Jester Procedures Mod v2.0
 *
 * Data sourced from Heatblur F-4E Manual
 * https://f4.manuals.heatblur.se/
 */

const MOD_VERSION = '2.0';

const PROCEDURES = {

  // ================================================================
  // DIVE TOSS (DT) - WRCS
  // ================================================================
  dive_toss: {
    id: "dive_toss",
    name: "DIVE TOSS",
    shortName: "DT",
    category: "WRCS",
    deliveryKnobPosition: "DT (right side)",
    description: "Radar-guided dive delivery with real-time WRCS ballistic computation. Approach from any direction, airspeed, and dive angle. Most accurate automated mode.",
    diagram: "img/dive_toss_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",     setting: "DT",               crew: "PLT" },
      { step: 3,  system: "NAV",   action: "HSI Mode Switches",      setting: "NAV COMP",         crew: "PLT" },
      { step: 4,  system: "RADAR", action: "Radar Mode",             setting: "AIR-GRD",          crew: "WSO" },
      { step: 5,  system: "RADAR", action: "Radar Range",            setting: "5 or 10 NM",       crew: "WSO" },
      { step: 6,  system: "RADAR", action: "Radar Power",            setting: "OPR",              crew: "WSO" },
      { step: 7,  system: "RADAR", action: "Antenna Stab Switch",    setting: "NOR",              crew: "WSO" },
      { step: 8,  system: "WRCS",  action: "Drag Coefficient",       setting: "SET (from calc)",  crew: "WSO" },
      { step: 9,  system: "WRCS",  action: "Release Advance",        setting: "SET if required",  crew: "WSO" },
      { step: 10, system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",            crew: "PLT" },
      { step: 11, system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 12, system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 13, system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 14, system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "WSO minimize receiver gain (MIN)",                        phase: "SETUP",   crew: "WSO", pilotNote: "Jester Radar > Gain to MIN" },
      { step: 2, action: "Initiate dive approximately 20% steeper than Direct mode", phase: "INGRESS", crew: "PLT" },
      { step: 3, action: "WSO achieve radar ground lock; call out confirmation",     phase: "LOCK",    crew: "WSO", pilotNote: "Jester Radar > Lock Ground Return" },
      { step: 4, action: "Maneuver pipper over intended target, wings level",        phase: "ATTACK",  crew: "PLT" },
      { step: 5, action: "Press and HOLD bomb button (inserts radar range to WRCS)", phase: "ATTACK",  crew: "PLT" },
      { step: 6, action: "Begin gentle pullout, wings level, constant turn rate",    phase: "RELEASE", crew: "PLT" },
      { step: 7, action: "WRCS automatically releases at computed intercept point",  phase: "RELEASE", crew: "AUTO" },
      { step: 8, action: "Release bomb button after ordnance separation",            phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Drag coefficient values remain relatively constant across typical attack profiles, making this a forgiving mode" },
      { type: "info",    text: "Radar must achieve solid ground return (not necessarily the actual target itself)" },
      { type: "info",    text: "Steering cues appear on HUD after bomb button is pressed" },
      { type: "tip",     text: "This is the most accurate automated delivery mode available on the F-4E" },
      { type: "warning", text: "Must maintain wings level and constant turn rate during pullout for accurate solution" },
      { type: "warning", text: "Do not release bomb button until ordnance has separated from aircraft" },
      { type: "solo",    text: "SINGLE PLAYER: WSO setup steps can be performed via the Jester AI wheel menu. Jester handles radar ground lock automatically during the attack when commanded." }
    ],

    wrcsSettings: {
      dragCoefficient: {
        label: "Drag Coefficient",
        range: "0.00 - 9.99",
        description: "Bias factor for ballistic computer compensating bomb trajectory. Values computed via Bombing Calculator (RCtrl+B) or tables.",
        crew: "WSO"
      },
      releaseAdvance: {
        label: "Release Advance",
        range: "0 - 999 ms",
        formula: "RA = (N_Tgt - 1) x I_R",
        formulaDesc: "where N_Tgt = desired impact bomb number, I_R = AWRU interval setting",
        description: "Advances release signal to compensate for ripple pattern. Set only when specific bomb-on-target is desired.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "30-45 degrees",
      typicalAltitude: "8,000-12,000 ft AGL entry",
      typicalSpeed: "450-550 KTAS",
      releaseAltitude: "4,000-6,000 ft AGL (varies)",
      minPulloutAlt: "3,000 ft AGL recommended"
    }
  },

  // ================================================================
  // DIRECT (Manual Release)
  // ================================================================
  direct: {
    id: "direct",
    name: "DIRECT",
    shortName: "DIR",
    category: "Manual",
    deliveryKnobPosition: "DIRECT (center)",
    description: "Classic visual dive bombing. Both ARBCS and WRCS are excluded. Pilot manually sets sight depression and hand-flies pipper onto target. Used for targets of opportunity, CAS, formation bombing, rockets, and flares.",
    diagram: "img/direct_profile.svg",

    setup: [
      { step: 1, system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",                  crew: "PLT" },
      { step: 2, system: "DSCG",  action: "Reticle Depression Knob", setting: "SET (from tables)",     crew: "PLT" },
      { step: 3, system: "DELIV", action: "Delivery Mode Knob",     setting: "DIRECT",               crew: "PLT" },
      { step: 4, system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",                crew: "PLT" },
      { step: 5, system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",      crew: "PLT" },
      { step: 6, system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",          crew: "PLT" },
      { step: 7, system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",      crew: "PLT" },
      { step: 8, system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",                  crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly attack profile per bombing tables for selected munition", phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "Establish proper dive angle, airspeed, and altitude",         phase: "INGRESS", crew: "PLT" },
      { step: 3, action: "Hand-fly to place pipper directly on target",                 phase: "ATTACK",  crew: "PLT" },
      { step: 4, action: "Press bomb button to release at planned altitude",            phase: "RELEASE", crew: "PLT" },
      { step: 5, action: "Initiate pullout and egress",                                 phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Reticle depression is referenced from Fuselage Reference Line (FRL), range 0-245 mils in 1-mil increments" },
      { type: "info",    text: "Both ARBCS and WRCS computers are excluded in this mode; delivery is entirely manual" },
      { type: "tip",     text: "Suitable for targets of opportunity, CAS, formation bombing as wingman, rocket employment, and flare delivery" },
      { type: "tip",     text: "Use Bombing Calculator (RCtrl+B) to compute sight depression for munition, altitude, speed, and dive angle" },
      { type: "warning", text: "Accuracy depends entirely on pilot skill: correct dive angle, airspeed, altitude, and pipper placement" },
      { type: "solo",    text: "SINGLE PLAYER: All setup and attack steps are pilot-controlled. No WSO interaction required for Direct mode." }
    ],

    attackProfile: {
      typicalDiveAngle: "20-45 degrees",
      typicalAltitude: "8,000-12,000 ft AGL entry",
      typicalSpeed: "450-500 KTAS",
      releaseAltitude: "4,000-5,000 ft AGL",
      minPulloutAlt: "3,000 ft AGL recommended"
    }
  },

  // ================================================================
  // TARGET FIND (TGT FIND) - WRCS
  // ================================================================
  tgt_find: {
    id: "tgt_find",
    name: "TARGET FIND",
    shortName: "TGT FIND",
    category: "WRCS",
    deliveryKnobPosition: "TGT FIND (center)",
    description: "With Pave Spike: uses pod line-of-sight for WRCS Dive Toss delivery, comparable to CCRP in modern aircraft. Without Pave Spike: practice mode identical to OFFSET but sends no release signal.",
    diagram: "img/tgt_find_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",         setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",      setting: "TGT FIND",         crew: "PLT" },
      { step: 3,  system: "NAV",   action: "HSI Mode Switches",       setting: "NAV COMP",         crew: "PLT" },
      { step: 4,  system: "NAV",   action: "Navigation Mode Selector", setting: "NAV COMP",        crew: "WSO" },
      { step: 5,  system: "NAV",   action: "INS Mode Knob",           setting: "NAV",              crew: "WSO" },
      { step: 6,  system: "TGP",   action: "Pave Spike Power",        setting: "ON / STBY",        crew: "WSO" },
      { step: 7,  system: "TGP",   action: "Pave Spike Mode",         setting: "TRACK",            crew: "WSO" },
      { step: 8,  system: "WRCS",  action: "TGT FIND Switch",         setting: "HOLD",             crew: "WSO" },
      { step: 9,  system: "WRCS",  action: "Release Advance",         setting: "SET if required",  crew: "WSO" },
      { step: 10, system: "WPNS",  action: "Weapon Select Knob",      setting: "BOMBS",            crew: "PLT" },
      { step: 11, system: "WPNS",  action: "AWRU Interval & Qty",     setting: "SET per loadout",  crew: "PLT" },
      { step: 12, system: "WPNS",  action: "Nose/Tail Arm Switch",    setting: "As required",      crew: "PLT" },
      { step: 13, system: "WPNS",  action: "Station Select Buttons",  setting: "Select stations",  crew: "PLT" },
      { step: 14, system: "WPNS",  action: "Master Arm Switch",       setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "WSO place Pave Spike on target and track",            phase: "SETUP",   crew: "WSO", pilotNote: "Jester TGP > Slave to Waypoint / Ground Stabilize" },
      { step: 2, action: "WSO activate laser for accurate slant range",          phase: "SETUP",   crew: "WSO", pilotNote: "Jester TGP > Laser On" },
      { step: 3, action: "Fly toward target area, maintain wings level",         phase: "INGRESS", crew: "PLT" },
      { step: 4, action: "Press and HOLD bomb button",                           phase: "ATTACK",  crew: "PLT" },
      { step: 5, action: "Steering cues appear on HUD; follow for solution",     phase: "ATTACK",  crew: "PLT" },
      { step: 6, action: "Bombs release automatically when parameters are met",  phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Release bomb button after ordnance separation",        phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Without Pave Spike installed, TGT FIND functions as a practice mode identical to OFFSET but sends no release signal" },
      { type: "info",    text: "With Pave Spike, the WRCS uses pod line-of-sight instead of radar lock for ballistic computation" },
      { type: "tip",     text: "This is the closest equivalent to CCRP modes found in modern aircraft" },
      { type: "tip",     text: "Laser activation provides more accurate slant range measurement" },
      { type: "warning", text: "Requires Pave Spike targeting pod for operational use" },
      { type: "solo",    text: "SINGLE PLAYER: Command Jester to power on, track, and laser-designate via the TGP wheel menu. Pilot can monitor targeting on the DSCG repeater." }
    ],

    attackProfile: {
      typicalDiveAngle: "0-30 degrees (level to shallow dive)",
      typicalAltitude: "8,000-15,000 ft AGL",
      typicalSpeed: "450-500 KTAS",
      releaseAltitude: "Varies (computed by WRCS)"
    }
  },

  // ================================================================
  // DIVE LAYDOWN (DL) - WRCS
  // ================================================================
  dive_laydown: {
    id: "dive_laydown",
    name: "DIVE LAYDOWN",
    shortName: "DL",
    category: "WRCS",
    deliveryKnobPosition: "DL (right side)",
    description: "Radar-guided dive attack followed by level-off for automatic release at a preset range from target. Combines radar accuracy with low-altitude release.",
    diagram: "img/dive_laydown_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",     setting: "DL",               crew: "PLT" },
      { step: 3,  system: "NAV",   action: "HSI Mode Switches",      setting: "NAV COMP",         crew: "PLT" },
      { step: 4,  system: "RADAR", action: "Radar Mode",             setting: "AIR-GRD",          crew: "WSO" },
      { step: 5,  system: "RADAR", action: "Radar Range",            setting: "5 or 10 NM",       crew: "WSO" },
      { step: 6,  system: "RADAR", action: "Radar Power",            setting: "OPR",              crew: "WSO" },
      { step: 7,  system: "RADAR", action: "Antenna Stab Switch",    setting: "NOR",              crew: "WSO" },
      { step: 8,  system: "WRCS",  action: "Release Range",          setting: "SET (from tables)", crew: "WSO" },
      { step: 9,  system: "WRCS",  action: "Release Advance",        setting: "SET if required",  crew: "WSO" },
      { step: 10, system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS (or RKTS & DISP)", crew: "PLT" },
      { step: 11, system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 12, system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 13, system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 14, system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Enter attack at steeper-than-normal dive angle",          phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "WSO achieve radar ground lock; call out confirmation",     phase: "LOCK",    crew: "WSO", pilotNote: "Jester Radar > Lock Ground Return" },
      { step: 3, action: "Position pipper on target",                                phase: "ATTACK",  crew: "PLT" },
      { step: 4, action: "Press and HOLD bomb release button",                       phase: "ATTACK",  crew: "PLT" },
      { step: 5, action: "Level out at bombing-table planned altitude",              phase: "ATTACK",  crew: "PLT" },
      { step: 6, action: "Maintain target speed, heading, and wings-level attitude", phase: "RELEASE", crew: "PLT" },
      { step: 7, action: "Weapons release automatically at configured release range",phase: "RELEASE", crew: "AUTO" },
      { step: 8, action: "Release bomb button after ordnance separation",            phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Release range is the preset distance from target at which weapons deploy automatically" },
      { type: "info",    text: "Suitable for CBU dispensers when using RKTS & DISP weapon select" },
      { type: "tip",     text: "Accuracy depends heavily on correct altitude and pitch angle at release point" },
      { type: "warning", text: "Must level off at correct planned altitude before reaching release range" },
      { type: "warning", text: "Release Range must NOT be set to same value as Target Range on WRCS panel" },
      { type: "solo",    text: "SINGLE PLAYER: WSO radar and WRCS steps can be performed via Jester wheel menus. Jester handles radar ground lock when commanded." }
    ],

    wrcsSettings: {
      releaseRange: {
        label: "Release Range",
        range: "0 - 9,990 ft (x10) or 99,900 ft (x100)",
        description: "Distance from target at which weapons are automatically released. Set from bombing tables for selected munition, altitude, and speed.",
        crew: "WSO"
      },
      releaseAdvance: {
        label: "Release Advance",
        range: "0 - 999 ms",
        formula: "RA = (N_Tgt - 1) x I_R",
        formulaDesc: "where N_Tgt = desired impact bomb number, I_R = AWRU interval setting",
        description: "Advances release signal to compensate for ripple pattern.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "30-50 degrees (steeper than Direct)",
      typicalAltitude: "8,000-12,000 ft AGL entry",
      typicalSpeed: "450-550 KTAS",
      releaseAltitude: "500-2,000 ft AGL (low level)",
      minPulloutAlt: "Planned release altitude"
    }
  },

  // ================================================================
  // LAYDOWN (L) - WRCS
  // ================================================================
  laydown: {
    id: "laydown",
    name: "LAYDOWN",
    shortName: "L",
    category: "WRCS",
    deliveryKnobPosition: "L (right side)",
    description: "Level delivery using distance from Initial Point (IP) measured by INS. Aircraft overflies the IP and WRCS calculates distance traveled to determine automatic release point.",
    diagram: "img/laydown_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",         setting: "A/G",                  crew: "PLT" },
      { step: 2,  system: "DSCG",  action: "Reticle Depression Knob",  setting: "SET as required",      crew: "PLT" },
      { step: 3,  system: "DELIV", action: "Delivery Mode Knob",      setting: "L (LAYDOWN)",          crew: "PLT" },
      { step: 4,  system: "NAV",   action: "HSI Mode Switches",       setting: "NAV COMP",             crew: "PLT" },
      { step: 5,  system: "WRCS",  action: "Target Range (ALT/RANGE)", setting: "IP-to-target dist",   crew: "WSO" },
      { step: 6,  system: "WRCS",  action: "Release Range",           setting: "SET (from tables)",     crew: "WSO" },
      { step: 7,  system: "WRCS",  action: "Release Advance",         setting: "SET if required",      crew: "WSO" },
      { step: 8,  system: "WPNS",  action: "Weapon Select Knob",      setting: "BOMBS",                crew: "PLT" },
      { step: 9,  system: "WPNS",  action: "AWRU Interval & Qty",     setting: "SET per loadout",      crew: "PLT" },
      { step: 10, system: "WPNS",  action: "Nose/Tail Arm Switch",    setting: "As required",          crew: "PLT" },
      { step: 11, system: "WPNS",  action: "Station Select Buttons",  setting: "Select stations",      crew: "PLT" },
      { step: 12, system: "WPNS",  action: "Master Arm Switch",       setting: "ARM",                  crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Depress optical sight to align with target when overhead IP",  phase: "SETUP",   crew: "PLT" },
      { step: 2, action: "Fly level toward and over the IP at planned alt and speed",    phase: "INGRESS", crew: "PLT" },
      { step: 3, action: "Cross the IP; hold bomb button when pipper reaches target",    phase: "ATTACK",  crew: "PLT" },
      { step: 4, action: "WRCS calculates distance traveled via INS",                    phase: "RELEASE", crew: "AUTO" },
      { step: 5, action: "Maintain heading, speed, and altitude",                        phase: "RELEASE", crew: "PLT" },
      { step: 6, action: "Weapons release automatically at configured Release Range",    phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Release bomb button after ordnance separation",                phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Target Range (ALT/RANGE) is set to distance from IP to target in LAYDOWN mode, NOT target altitude" },
      { type: "info",    text: "IP can be identified by: visual recognition, TACAN, radio confirmation, or optical sight trigonometry" },
      { type: "tip",     text: "Best suited for pre-planned strikes where IP is well-known and target bearing from IP is established" },
      { type: "warning", text: "Release Range must NOT be set to the same value as Target Range" },
      { type: "warning", text: "INS accuracy degrades over time; recent alignment improves results" },
      { type: "solo",    text: "SINGLE PLAYER: WSO WRCS settings can be set via the Jester wheel menu or by switching to the rear cockpit." }
    ],

    wrcsSettings: {
      targetRange: {
        label: "Target Range (ALT/RANGE knob)",
        range: "0 - 24,900 ft (100-ft increments)",
        description: "In LAYDOWN mode this is set to the distance from IP to target, NOT target altitude MSL. Computed from mission planning.",
        crew: "WSO"
      },
      releaseRange: {
        label: "Release Range",
        range: "0 - 9,990 ft (x10) or 99,900 ft (x100)",
        description: "Distance past IP at which weapons are released. Computed from bombing tables for selected munition and release parameters.",
        crew: "WSO"
      },
      releaseAdvance: {
        label: "Release Advance",
        range: "0 - 999 ms",
        formula: "RA = (N_Tgt - 1) x I_R",
        formulaDesc: "where N_Tgt = desired impact bomb number, I_R = AWRU interval setting",
        description: "Advances release signal to compensate for ripple pattern.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level flight)",
      typicalAltitude: "200-1,000 ft AGL",
      typicalSpeed: "450-540 KTAS",
      releaseAltitude: "Same as ingress (level)"
    }
  },

  // ================================================================
  // OFFSET BOMB (OFF SET) - WRCS
  // ================================================================
  offset: {
    id: "offset",
    name: "OFFSET BOMB",
    shortName: "OFF SET",
    category: "WRCS",
    deliveryKnobPosition: "OFF SET (right side)",
    description: "Blind bombing using WRCS, INS, and radar integration. Target position is determined by N/S and E/W offset from a known reference point. Works in both visual and instrument conditions. Two approaches: Visual IP (VIP) or Radar IP (RIP).",
    diagram: "img/offset_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",          setting: "A/G",                  crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",       setting: "OFF SET",              crew: "PLT" },
      { step: 3,  system: "NAV",   action: "HSI Mode Switches",        setting: "NAV COMP",             crew: "PLT" },
      { step: 4,  system: "NAV",   action: "Navigation Mode Selector",  setting: "NAV COMP",            crew: "WSO" },
      { step: 5,  system: "NAV",   action: "INS Mode Knob",            setting: "NAV",                  crew: "WSO" },
      { step: 6,  system: "WRCS",  action: "Target Distance N/S",      setting: "SET (100-ft incr)",    crew: "WSO" },
      { step: 7,  system: "WRCS",  action: "Target Distance E/W",      setting: "SET (100-ft incr)",    crew: "WSO" },
      { step: 8,  system: "WRCS",  action: "ALT RANGE (IP altitude)",  setting: "SET MSL (100-ft)",     crew: "WSO" },
      { step: 9,  system: "WRCS",  action: "Release Range",            setting: "SET (from tables)",     crew: "WSO" },
      { step: 10, system: "WRCS",  action: "Release Advance",          setting: "SET if required",      crew: "WSO" },
      { step: 11, system: "WRCS",  action: "TGT FIND Switch",          setting: "HOLD",                 crew: "WSO" },
      { step: 12, system: "RADAR", action: "Radar Power",              setting: "OPR (for RIP)",        crew: "WSO" },
      { step: 13, system: "RADAR", action: "Radar Mode",               setting: "MAP PPI (for RIP)",    crew: "WSO" },
      { step: 14, system: "RADAR", action: "Antenna Stab Switch",      setting: "NOR (for RIP)",        crew: "WSO" },
      { step: 15, system: "RADAR", action: "Scan Switch",              setting: "WIDE (for RIP)",       crew: "WSO" },
      { step: 16, system: "RADAR", action: "Radar Range",              setting: "AI 10 or AI 25",       crew: "WSO" },
      { step: 17, system: "WPNS",  action: "Weapon Select Knob",       setting: "BOMBS",                crew: "PLT" },
      { step: 18, system: "WPNS",  action: "AWRU Interval & Qty",      setting: "SET per loadout",      crew: "PLT" },
      { step: 19, system: "WPNS",  action: "Nose/Tail Arm Switch",     setting: "As required",          crew: "PLT" },
      { step: 20, system: "WPNS",  action: "Station Select Buttons",   setting: "Select stations",      crew: "PLT" },
      { step: 21, system: "WPNS",  action: "Master Arm Switch",        setting: "ARM",                  crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "VIP: Overfly visual IP / RIP: Acquire radar return of known point", phase: "INGRESS", crew: "PLT" },
      { step: 2,  action: "RIP: Position Along Track cursor below RIP return on radar",         phase: "LOCK",    crew: "WSO", pilotNote: "Jester handles cursor positioning via Offset menu" },
      { step: 3,  action: "RIP: Slew Cross Track cursor over RIP return",                       phase: "LOCK",    crew: "WSO", pilotNote: "Jester handles cursor positioning via Offset menu" },
      { step: 4,  action: "WSO push FREEZE (memorizes position / initiates radar tracking)",     phase: "LOCK",    crew: "WSO", pilotNote: "Jester Offset > Freeze" },
      { step: 5,  action: "WSO push TARGET INSERT (shifts cursors to offset target)",            phase: "LOCK",    crew: "WSO", pilotNote: "Jester Offset > Target Insert" },
      { step: 6,  action: "Navigation displays now show offset from calculated release point",   phase: "ATTACK",  crew: "AUTO" },
      { step: 7,  action: "Maneuver to align course to computed release point",                  phase: "ATTACK",  crew: "PLT" },
      { step: 8,  action: "Maintain planned airspeed and altitude",                              phase: "ATTACK",  crew: "PLT" },
      { step: 9,  action: "Press and HOLD bomb release button before reaching release point",    phase: "RELEASE", crew: "PLT" },
      { step: 10, action: "Pull-up light illuminates at release",                                phase: "RELEASE", crew: "AUTO" },
      { step: 11, action: "Release bomb button after ordnance separation",                       phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Maximum offset per axis: 99,900 ft (~16.44 NM)" },
      { type: "info",    text: "VIP method uses visual flyover; RIP method uses radar target identification" },
      { type: "info",    text: "After TARGET INSERT: ADI, Sight, BDHI, and HSI show offset steering" },
      { type: "tip",     text: "Along Track cursor must be the FIRST applied command in target insertion sequence" },
      { type: "tip",     text: "If bomb button released early, can recover by pressing again before release point" },
      { type: "warning", text: "ALT RANGE must not exceed aircraft current MSL (x100) in OFFSET mode or WRCS can be damaged" },
      { type: "warning", text: "Release Range must NOT be set to same value as Target Range" },
      { type: "solo",    text: "SINGLE PLAYER: WSO WRCS, Nav, and radar steps can be set via Jester wheel menus. For RIP approach, Jester handles cursor positioning and FREEZE/TARGET INSERT when commanded." }
    ],

    wrcsSettings: {
      targetDistNS: {
        label: "Target Distance N/S",
        range: "0 - 99,900 ft (100-ft increments)",
        description: "North or South offset from IP to target. Set N or S prefix with toggle.",
        crew: "WSO"
      },
      targetDistEW: {
        label: "Target Distance E/W",
        range: "0 - 99,900 ft (100-ft increments)",
        description: "East or West offset from IP to target. Set E or W prefix with toggle.",
        crew: "WSO"
      },
      altRange: {
        label: "ALT RANGE (IP Altitude)",
        range: "0 - 24,900 ft MSL (100-ft increments)",
        description: "IP altitude in MSL. CAUTION: must not exceed aircraft's current MSL (x100).",
        crew: "WSO"
      },
      releaseRange: {
        label: "Release Range",
        range: "0 - 9,990 ft (x10) or 99,900 ft (x100)",
        description: "Computed from bombing tables. Use RANGE switch for x10 (NORM) or x100 multiplier.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level flight)",
      typicalAltitude: "200-5,000 ft AGL",
      typicalSpeed: "420-500 KTAS"
    }
  },

  // ================================================================
  // LOFT - ARBCS
  // ================================================================
  loft: {
    id: "loft",
    name: "LOFT",
    shortName: "LOFT",
    category: "ARBCS",
    deliveryKnobPosition: "LOFT (left side)",
    description: "Low-altitude ingress to IP, then 4G pull-up with automatic release at a programmed LOW gyro angle. Weapons are lofted toward the target from a climb.",
    diagram: "img/loft_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",         setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",      setting: "LOFT",             crew: "PLT" },
      { step: 3,  system: "ARBCS", action: "Antenna Stab Switch",     setting: "NOR",              crew: "WSO" },
      { step: 4,  system: "ARBCS", action: "LOW ANGLE Knob",          setting: "SET (from tables)", crew: "WSO" },
      { step: 5,  system: "ARBCS", action: "PULL-UP Timer",           setting: "SET (from tables)", crew: "WSO" },
      { step: 6,  system: "ARBCS", action: "RELEASE Timer",           setting: "0.0 (zero)",       crew: "WSO" },
      { step: 7,  system: "WPNS",  action: "Weapon Select Knob",      setting: "BOMBS",            crew: "PLT" },
      { step: 8,  system: "WPNS",  action: "AWRU Interval & Qty",     setting: "SET per loadout",  crew: "PLT" },
      { step: 9,  system: "WPNS",  action: "Nose/Tail Arm Switch",    setting: "As required",      crew: "PLT" },
      { step: 10, system: "WPNS",  action: "Station Select Buttons",  setting: "Select stations",  crew: "PLT" },
      { step: 11, system: "WPNS",  action: "Master Arm Switch",       setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly level toward IP at planned altitude and airspeed",        phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "At IP, press and HOLD bomb button; timer begins countdown",   phase: "TIMER",   crew: "PLT" },
      { step: 3, action: "Horizontal ADI bar maintains level flight reference",          phase: "TIMER",   crew: "AUTO" },
      { step: 4, action: "At pull-up point (tone sounds), initiate 4G pull-up",         phase: "PULLUP",  crew: "PLT" },
      { step: 5, action: "Follow ADI needles: keep horizontal needle centered",          phase: "PULLUP",  crew: "PLT" },
      { step: 6, action: "Weapons auto-release when LOW gyro angle is achieved",         phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Release bomb button after ordnance separation",                phase: "EGRESS",  crew: "PLT" },
      { step: 8, action: "Continue pull or roll to egress heading",                      phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Pull-Up Timer counts down from IP to the pull-up point; audio tone signals the maneuver" },
      { type: "info",    text: "Release Timer is set to ZERO in LOFT mode (release is controlled by gyro angle)" },
      { type: "info",    text: "ADI needles are taken over by ARBCS during the bombing run for steering guidance" },
      { type: "tip",     text: "Maintain exactly 4G during pull-up for accurate solution; ADI horizontal needle helps maintain correct G" },
      { type: "warning", text: "Pull-up audio tone is critical; do not begin pull-up early or late" },
      { type: "warning", text: "ADI needles stow after last munition releases" },
      { type: "solo",    text: "SINGLE PLAYER: WSO ARBCS settings (LOW ANGLE, timers) can be set via Jester wheel menu or rear cockpit. Set before takeoff or during ingress." }
    ],

    arbcsSettings: {
      lowAngle: {
        label: "LOW ANGLE Knob",
        range: "0.0 - 89.9 degrees",
        description: "Pitch angle (from level) at which bombs release during pull-up. Computed from bombing tables for munition type, entry speed, and altitude.",
        crew: "WSO"
      },
      pullUpTimer: {
        label: "Pull-Up Timer",
        range: "0.0 - 60.0 seconds (0.1-sec increments)",
        description: "Time from IP to pull-up point. Computed from distance IP-to-target, entry airspeed, and planned profile.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level ingress)",
      typicalAltitude: "200-500 ft AGL ingress",
      typicalSpeed: "450-540 KTAS",
      releaseAltitude: "Climbing (varies with angle)"
    }
  },

  // ================================================================
  // TIMED LADD (T LAD) - ARBCS
  // ================================================================
  timed_ladd: {
    id: "timed_ladd",
    name: "TIMED LADD",
    shortName: "T LAD",
    category: "ARBCS",
    deliveryKnobPosition: "T LAD (left side)",
    description: "Low Angle Drogue Delivery. Low-altitude ingress with 3.5G pull-up into a 45-degree climb; weapons loft and release at apex after release timer expires. Originally designed for tactical nuclear weapons.",
    diagram: "img/timed_ladd_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",     setting: "T LAD",            crew: "PLT" },
      { step: 3,  system: "ARBCS", action: "PULL-UP Timer",          setting: "SET (from tables)", crew: "WSO" },
      { step: 4,  system: "ARBCS", action: "RELEASE Timer",          setting: "SET (from tables)", crew: "WSO" },
      { step: 5,  system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",            crew: "PLT" },
      { step: 6,  system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 7,  system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 8,  system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 9,  system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly level toward IP at planned altitude and airspeed",          phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "At IP, press and HOLD bomb button; pull-up timer begins",       phase: "TIMER",   crew: "PLT" },
      { step: 3, action: "Timer counts down; maintain level flight",                      phase: "TIMER",   crew: "PLT" },
      { step: 4, action: "Pull-up audio tone sounds; initiate 3.5G pull-up",              phase: "PULLUP",  crew: "PLT" },
      { step: 5, action: "Maintain 3.5G until 45-degree pitch achieved",                  phase: "PULLUP",  crew: "PLT" },
      { step: 6, action: "Release timer begins after pull-up warning tone",               phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Weapons auto-release at release timer expiration",              phase: "RELEASE", crew: "AUTO" },
      { step: 8, action: "Release bomb button; execute escape maneuver",                  phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Originally designed for tactical nuclear weapon delivery (drogue-retarded)" },
      { type: "info",    text: "Two timers required: Pull-Up Timer (IP to maneuver point) and Release Timer (maneuver to release)" },
      { type: "info",    text: "Pull-up is 3.5G (not 4G like LOFT); target pitch is 45 degrees" },
      { type: "tip",     text: "Compute both timer values from bombing tables or calculator for your entry altitude/airspeed" },
      { type: "warning", text: "Maintain exactly 3.5G during pull-up; under/over-G affects release timing and accuracy" },
      { type: "solo",    text: "SINGLE PLAYER: WSO ARBCS timers can be set via Jester wheel menu or rear cockpit. Compute both timer values before the attack." }
    ],

    arbcsSettings: {
      pullUpTimer: {
        label: "Pull-Up Timer (T1)",
        range: "0.0 - 60.0 seconds (0.1-sec increments)",
        description: "Time from IP flyover to pull-up initiation point. Computed from distance, entry speed, and altitude.",
        crew: "WSO"
      },
      releaseTimer: {
        label: "Release Timer (T2)",
        range: "0.0 - 30.0 seconds (0.1-sec increments)",
        description: "Time from pull-up warning tone to weapon release. Computed from pull-up G, target pitch, and desired loft trajectory.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level ingress)",
      typicalAltitude: "200-500 ft AGL ingress",
      typicalSpeed: "450-540 KTAS",
      releaseAltitude: "Climbing at 45-deg pitch"
    }
  },

  // ================================================================
  // TIMED OVER-THE-SHOULDER (O/S) - ARBCS
  // ================================================================
  timed_os: {
    id: "timed_os",
    name: "TIMED OVER-THE-SHOULDER",
    shortName: "O/S",
    category: "ARBCS",
    deliveryKnobPosition: "O/S (left side)",
    description: "Release angle exceeds 90 degrees, tossing weapons rearward. After timer countdown from IP, pilot executes a 4G wings-level Immelmann maneuver. Weapons release at the set HIGH gyro angle.",
    diagram: "img/timed_os_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",     setting: "O/S",              crew: "PLT" },
      { step: 3,  system: "ARBCS", action: "HIGH ANGLE Knob",        setting: "SET >90 deg",      crew: "WSO" },
      { step: 4,  system: "ARBCS", action: "PULL-UP Timer",          setting: "SET (from tables)", crew: "WSO" },
      { step: 5,  system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",            crew: "PLT" },
      { step: 6,  system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 7,  system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 8,  system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 9,  system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly level toward IP at planned altitude and airspeed",       phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "At IP, press and HOLD bomb button; timer begins",            phase: "TIMER",   crew: "PLT" },
      { step: 3, action: "Audible tone and Pull-Up Lamp signal maneuver initiation",   phase: "TIMER",   crew: "AUTO" },
      { step: 4, action: "Initiate 4G wings-level pull-up (Immelmann)",                phase: "PULLUP",  crew: "PLT" },
      { step: 5, action: "Keep horizontal ADI needle centered for accuracy",            phase: "PULLUP",  crew: "PLT" },
      { step: 6, action: "Weapons release automatically at set HIGH angle (>90 deg)",  phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Release bomb button after ordnance separation",               phase: "EGRESS",  crew: "PLT" },
      { step: 8, action: "Complete Immelmann; roll wings level on reciprocal heading",  phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "HIGH ANGLE must be set above 90 degrees for over-the-shoulder toss" },
      { type: "info",    text: "Weapons are released rearward (behind the aircraft) during the Immelmann" },
      { type: "info",    text: "LOW ANGLE and secondary timer can remain at any value" },
      { type: "tip",     text: "Keeping the horizontal ADI needle centered during pull-up is critical for accuracy" },
      { type: "warning", text: "Must maintain exactly 4G and wings level throughout the Immelmann" },
      { type: "solo",    text: "SINGLE PLAYER: WSO ARBCS settings (HIGH ANGLE, Pull-Up Timer) can be set via Jester wheel menu or rear cockpit." }
    ],

    arbcsSettings: {
      highAngle: {
        label: "HIGH ANGLE Knob",
        range: "70.0 - 179.9 degrees",
        description: "Release angle measured from level. Must exceed 90 degrees for O/S delivery. Weapons toss rearward at this angle.",
        crew: "WSO"
      },
      pullUpTimer: {
        label: "Pull-Up Timer",
        range: "0.0 - 60.0 seconds (0.1-sec increments)",
        description: "Time from IP to pull-up initiation. Computed from distance IP-to-target and entry speed.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level ingress)",
      typicalAltitude: "200-500 ft AGL ingress",
      typicalSpeed: "450-500 KTAS",
      releaseAltitude: "Inverted at Immelmann apex"
    }
  },

  // ================================================================
  // INSTANTANEOUS OVER-THE-SHOULDER (INST O/S) - ARBCS
  // ================================================================
  inst_os: {
    id: "inst_os",
    name: "INST OVER-THE-SHOULDER",
    shortName: "INST O/S",
    category: "ARBCS",
    deliveryKnobPosition: "INST O/S (left side)",
    description: "No IP or timer required. Target designated by pressing bomb button directly over the target, then immediately executing a 4G wings-level Immelmann. Weapons release at configured HIGH angle.",
    diagram: "img/inst_os_profile.svg",

    setup: [
      { step: 1, system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2, system: "DELIV", action: "Delivery Mode Knob",     setting: "INST O/S",         crew: "PLT" },
      { step: 3, system: "ARBCS", action: "HIGH ANGLE Knob",        setting: "SET >90 deg",      crew: "WSO" },
      { step: 4, system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",            crew: "PLT" },
      { step: 5, system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 6, system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 7, system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 8, system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly directly over the target at planned altitude and speed",  phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "Position aircraft directly over target",                       phase: "ATTACK",  crew: "PLT" },
      { step: 3, action: "Press and HOLD bomb button",                                   phase: "ATTACK",  crew: "PLT" },
      { step: 4, action: "IMMEDIATELY initiate 4G wings-level pull-up (Immelmann)",      phase: "PULLUP",  crew: "PLT" },
      { step: 5, action: "Keep horizontal ADI needle centered for accuracy",              phase: "PULLUP",  crew: "PLT" },
      { step: 6, action: "Weapons release automatically at configured HIGH angle",       phase: "RELEASE", crew: "AUTO" },
      { step: 7, action: "Release bomb button after ordnance separation",                 phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "No Initial Point (IP) or timer required; simplest ARBCS toss mode" },
      { type: "info",    text: "HIGH ANGLE must exceed 90 degrees" },
      { type: "info",    text: "Bomb button press and pull-up initiation should be nearly simultaneous over the target" },
      { type: "tip",     text: "Useful for targets of opportunity; no pre-planning required beyond HIGH ANGLE setting" },
      { type: "warning", text: "Must be directly over the target when bomb button is pressed; lateral offset causes miss" },
      { type: "warning", text: "Maintain 4G and wings level throughout Immelmann for accuracy" },
      { type: "solo",    text: "SINGLE PLAYER: WSO HIGH ANGLE knob can be set via Jester wheel menu or rear cockpit. No timer or IP setup required." }
    ],

    arbcsSettings: {
      highAngle: {
        label: "HIGH ANGLE Knob",
        range: "70.0 - 179.9 degrees",
        description: "Release angle from level. Must exceed 90 degrees. Weapons toss rearward at this pitch angle during the Immelmann.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level ingress)",
      typicalAltitude: "200-500 ft AGL",
      typicalSpeed: "450-500 KTAS",
      releaseAltitude: "Inverted at Immelmann apex"
    }
  },

  // ================================================================
  // TIMED LEVEL (TL) - ARBCS
  // ================================================================
  timed_level: {
    id: "timed_level",
    name: "TIMED LEVEL",
    shortName: "TL",
    category: "ARBCS",
    deliveryKnobPosition: "TL (left side)",
    description: "Most basic ARBCS bombing mode. Straight-and-level release after a timed countdown from IP. No pull-up, no ADI needle takeover. Pilot must manually maintain wings level and steady flight.",
    diagram: "img/timed_level_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G",              crew: "PLT" },
      { step: 2,  system: "DELIV", action: "Delivery Mode Knob",     setting: "TL",               crew: "PLT" },
      { step: 3,  system: "ARBCS", action: "PULL-UP Timer",          setting: "SET (calculated)",  crew: "WSO" },
      { step: 4,  system: "ARBCS", action: "RELEASE Timer",          setting: "0.0 (zero)",       crew: "WSO" },
      { step: 5,  system: "WPNS",  action: "Weapon Select Knob",     setting: "BOMBS",            crew: "PLT" },
      { step: 6,  system: "WPNS",  action: "AWRU Interval & Qty",    setting: "SET per loadout",  crew: "PLT" },
      { step: 7,  system: "WPNS",  action: "Nose/Tail Arm Switch",   setting: "As required",      crew: "PLT" },
      { step: 8,  system: "WPNS",  action: "Station Select Buttons", setting: "Select stations",  crew: "PLT" },
      { step: 9,  system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Calculate Pull-Up Timer: distance IP-to-release / groundspeed", phase: "SETUP",   crew: "WSO", pilotNote: "Calculate before flight; set timer via Jester or rear cockpit" },
      { step: 2, action: "Fly level toward IP at planned altitude and airspeed",           phase: "INGRESS", crew: "PLT" },
      { step: 3, action: "At IP flyover, press and HOLD bomb button; timer begins",        phase: "TIMER",   crew: "PLT" },
      { step: 4, action: "Maintain straight level flight at planned airspeed and altitude", phase: "TIMER",   crew: "PLT" },
      { step: 5, action: "Weapons release automatically when timer reaches zero",          phase: "RELEASE", crew: "AUTO" },
      { step: 6, action: "Release bomb button after ordnance separation",                  phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Pull-Up Timer is used as the release timer in this mode (Release Timer set to 0)" },
      { type: "info",    text: "HIGH/LOW Angle knobs can remain at any value; they are not used" },
      { type: "info",    text: "NO pull-up audio tone or ADI needle takeover occurs in this mode" },
      { type: "tip",     text: "Timer = Distance from IP to release point (ft) / Groundspeed (ft/sec)" },
      { type: "warning", text: "Pilot must manually maintain wings level and stable flight; no automated guidance in TL mode" },
      { type: "warning", text: "Any deviation in speed, heading, or altitude during timer countdown degrades accuracy" },
      { type: "solo",    text: "SINGLE PLAYER: WSO timer calculation and ARBCS setup can be done via Jester wheel menu or rear cockpit. Calculate timer value before flight." }
    ],

    arbcsSettings: {
      pullUpTimer: {
        label: "Pull-Up Timer (used as Release Timer)",
        range: "0.0 - 60.0 seconds (0.1-sec increments)",
        formula: "T = D / GS",
        formulaDesc: "where D = distance IP-to-release (ft), GS = groundspeed (ft/sec)",
        description: "Countdown from IP flyover to automatic release. Despite the name, no pull-up occurs; bombs release at timer expiration during level flight.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0 degrees (level flight)",
      typicalAltitude: "200-2,000 ft AGL",
      typicalSpeed: "420-500 KTAS",
      releaseAltitude: "Same as ingress (level)"
    }
  },

  // ================================================================
  // AGM-45 SHRIKE - WRCS
  // ================================================================
  agm45: {
    id: "agm45",
    name: "AGM-45 SHRIKE",
    shortName: "AGM-45",
    category: "WRCS",
    deliveryKnobPosition: "AGM-45 (right side)",
    description: "Anti-radiation missile delivery using WRCS pre-programmed engagement envelope. Three sub-modes: WRCS AGM-45 (envelope guidance), LABS LOFT (loft delivery), and DIRECT (manual dive). Targets enemy radar emitters.",
    diagram: "img/agm45_profile.svg",

    setup: [
      { step: 1,  system: "WPNS",  action: "Station Select Buttons", setting: "Select loaded stn", crew: "PLT" },
      { step: 2,  system: "WPNS",  action: "Weapon Select Knob",     setting: "ARM",              crew: "PLT" },
      { step: 3,  system: "DELIV", action: "Delivery Mode Knob",     setting: "AGM-45",           crew: "PLT" },
      { step: 4,  system: "DSCG",  action: "Sight Mode Knob",        setting: "A/G (optional)",   crew: "PLT" },
      { step: 5,  system: "WRCS",  action: "ALT RANGE (Tgt Alt)",    setting: "Target alt MSL",   crew: "WSO" },
      { step: 6,  system: "NAV",   action: "Flight Director",        setting: "ON (optional)",    crew: "PLT" },
      { step: 7,  system: "WPNS",  action: "Master Arm Switch",      setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Fly toward known or suspected radar emitter location",         phase: "INGRESS", crew: "PLT" },
      { step: 2, action: "Monitor ADI for steering guidance (if flight director on)",     phase: "INGRESS", crew: "PLT" },
      { step: 3, action: "Indexer lights indicate: PULL-UP / LEVEL / DIVE for envelope", phase: "ATTACK",  crew: "AUTO" },
      { step: 4, action: "Maneuver to achieve LEVEL indication (within launch envelope)", phase: "ATTACK",  crew: "PLT" },
      { step: 5, action: "For Direct sub-mode: establish 20+ degree dive toward emitter", phase: "ATTACK",  crew: "PLT" },
      { step: 6, action: "Press weapon release button to launch missile",                 phase: "RELEASE", crew: "PLT" },
      { step: 7, action: "Break away from target area; avoid SAM envelope",               phase: "EGRESS",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Three sub-modes available: WRCS AGM-45 (envelope), LABS LOFT, and WRCS DIRECT" },
      { type: "info",    text: "Indexer lights show engagement envelope status: PULL-UP, LEVEL (in range), DIVE" },
      { type: "info",    text: "WRCS receives missile look-angle data and corrected INS data for envelope computation" },
      { type: "tip",     text: "A dive angle of 20 degrees or more is recommended for Direct sub-mode" },
      { type: "tip",     text: "Flight director provides ADI guidance toward optimal launch parameters" },
      { type: "warning", text: "Missile homes on radar emissions; if emitter shuts down, missile guidance is lost" },
      { type: "warning", text: "Plan egress route to avoid remaining SAM threat envelope after launch" },
      { type: "solo",    text: "SINGLE PLAYER: WSO ALT RANGE setting can be set via Jester WRCS menu or rear cockpit. Most attack execution steps are pilot-controlled." }
    ],

    wrcsSettings: {
      altRange: {
        label: "ALT RANGE (Target Altitude)",
        range: "0 - 24,900 ft MSL (100-ft increments)",
        description: "Altitude of the target radar emitter in MSL. Used by WRCS to compute launch envelope.",
        crew: "WSO"
      }
    },

    attackProfile: {
      typicalDiveAngle: "0-30 degrees (level or dive)",
      typicalAltitude: "10,000-20,000 ft MSL",
      typicalSpeed: "450-550 KTAS",
      releaseAltitude: "Within computed envelope"
    }
  },

  // ================================================================
  // AIM-7 SPARROW - BVR Semi-Active Radar Homing
  // ================================================================
  aim7_sparrow: {
    id: "aim7_sparrow",
    name: "AIM-7 SPARROW",
    shortName: "AIM-7",
    category: "A/A Missile",
    description: "Beyond Visual Range semi-active radar homing missile. Requires continuous wave (CW) illumination from launch through impact. Primary BVR weapon of the F-4E.",
    diagram: "img/aim7_profile.svg",

    setup: [
      { step: 1,  system: "DSCG",  action: "Sight Mode Knob",          setting: "A/A",               crew: "PLT" },
      { step: 2,  system: "AWC",   action: "Weapon Select Knob",       setting: "RADAR (Sparrow)",    crew: "PLT" },
      { step: 3,  system: "RADAR", action: "Radar Mode",               setting: "RDR (Search)",       crew: "WSO" },
      { step: 4,  system: "RADAR", action: "Radar Range",              setting: "25 or 50 NM",        crew: "WSO" },
      { step: 5,  system: "RADAR", action: "Radar Power",              setting: "OPR",                crew: "WSO" },
      { step: 6,  system: "RADAR", action: "Antenna Elevation",        setting: "Adjust for target alt", crew: "WSO" },
      { step: 7,  system: "RADAR", action: "Pulse Switch",             setting: "As required",        crew: "WSO" },
      { step: 8,  system: "MSL",   action: "Missile Condition Switch",  setting: "Verify missile ready", crew: "WSO" },
      { step: 9,  system: "AWC",   action: "Master Arm Switch",        setting: "ARM",                crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "WSO search for target in RDR mode; adjust antenna elevation",     phase: "SEARCH",  crew: "WSO", pilotNote: "Jester searches automatically; adjust via Jester Radar menu" },
      { step: 2,  action: "WSO detect contact; call out bearing, range, altitude",            phase: "DETECT",  crew: "WSO", pilotNote: "Jester will call out radar contacts" },
      { step: 3,  action: "WSO half-action (challenge button) to initiate angle track",       phase: "TRACK",   crew: "WSO", pilotNote: "Jester Radar > Lock Target" },
      { step: 4,  action: "WSO full-action to achieve range track (full lock)",               phase: "TRACK",   crew: "WSO", pilotNote: "Jester completes lock sequence automatically" },
      { step: 5,  action: "Verify IFF interrogation (if ROE requires)",                       phase: "SORT",    crew: "WSO", pilotNote: "Jester IFF > Interrogate" },
      { step: 6,  action: "ASE (Allowable Steering Error) circle appears on ADI",             phase: "EMPLOY",  crew: "AUTO" },
      { step: 7,  action: "Maneuver to center steering dot within ASE circle",                phase: "EMPLOY",  crew: "PLT" },
      { step: 8,  action: "IN RANGE lamp illuminates; verify shoot cues",                     phase: "EMPLOY",  crew: "PLT" },
      { step: 9,  action: "Pull and HOLD trigger to fire; CW illumination begins",            phase: "EMPLOY",  crew: "PLT" },
      { step: 10, action: "Maintain lock and CW illumination until missile impacts",          phase: "EMPLOY",  crew: "PLT" },
      { step: 11, action: "Assess kill; break or re-engage as required",                      phase: "BREAK",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "AIM-7 requires continuous CW radar illumination from launch to impact (semi-active homing)" },
      { type: "info",    text: "F-4E carries up to 4 AIM-7 Sparrows in fuselage recesses" },
      { type: "info",    text: "ASE circle on ADI shows steering error; dot must be inside circle for valid shot" },
      { type: "tip",     text: "Half-action first to verify angle track before committing to full lock" },
      { type: "tip",     text: "Loft maneuver at max range increases missile energy and Pk" },
      { type: "warning", text: "Must maintain radar lock throughout entire missile time of flight" },
      { type: "warning", text: "Breaking lock after launch results in missile going ballistic (miss)" },
      { type: "warning", text: "Minimum range approximately 1.5 NM; missile needs time to guide" },
      { type: "solo",    text: "SINGLE PLAYER: Jester handles all radar search, detection, and lock operations. Command lock via the Jester Radar wheel menu. Pilot maintains CW illumination after launch." }
    ],

    radarSettings: {
      radarMode: {
        label: "Radar Mode",
        range: "RDR / BST / CAGE / CAA",
        description: "RDR (Search with Nutation) is primary mode for BVR. Conical scan provides angle track; range gate provides range track.",
        crew: "WSO"
      },
      radarRange: {
        label: "Radar Range",
        range: "5 / 10 / 25 / 50 / 100 / 200 NM",
        description: "Set to expected engagement range. 25 NM typical for initial search; 50 NM for early warning.",
        crew: "WSO"
      },
      antennaElevation: {
        label: "Antenna Elevation",
        range: "-60 to +60 degrees",
        description: "Tilt antenna to search at target's expected altitude. Adjust based on GCI/AWACS altitude calls.",
        crew: "WSO"
      }
    },

    attackProfile: {
      engagementRange: "10-25 NM (typical)",
      guidanceType: "Semi-Active Radar Homing (SARH)",
      radarMode: "RDR (Search w/ Nutation)",
      seekerType: "CW Receiver",
      typicalAltitude: "15,000-35,000 ft MSL",
      typicalSpeed: "Mach 0.85-1.2"
    }
  },

  // ================================================================
  // AIM-9 SIDEWINDER - WVR Infrared Homing
  // ================================================================
  aim9_sidewinder: {
    id: "aim9_sidewinder",
    name: "AIM-9 SIDEWINDER",
    shortName: "AIM-9",
    category: "A/A Missile",
    description: "Within Visual Range infrared homing missile. Fire-and-forget once launched. Seeker tracks target heat signature. Can be slaved to radar or used in boresight mode.",
    diagram: "img/aim9_profile.svg",

    setup: [
      { step: 1, system: "DSCG",  action: "Sight Mode Knob",          setting: "A/A",               crew: "PLT" },
      { step: 2, system: "AWC",   action: "Weapon Select Knob",       setting: "HEAT (Sidewinder)",  crew: "PLT" },
      { step: 3, system: "MSL",   action: "Sidewinder Cool Switch",   setting: "ON (wait 3+ min)",   crew: "PLT" },
      { step: 4, system: "RADAR", action: "Radar Mode",               setting: "BST or RDR",         crew: "WSO" },
      { step: 5, system: "RADAR", action: "Radar Power",              setting: "OPR",                crew: "WSO" },
      { step: 6, system: "AWC",   action: "Master Arm Switch",        setting: "ARM",                crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "Maneuver to rear hemisphere of target (heat signature)",     phase: "EMPLOY",  crew: "PLT" },
      { step: 2,  action: "Verify seeker is cooled (3+ minutes since coolant activated)", phase: "SETUP",   crew: "PLT" },
      { step: 3,  action: "If radar locked: seeker auto-slaves to radar target",         phase: "TRACK",   crew: "AUTO" },
      { step: 4,  action: "If no radar lock: use boresight, place pipper on target",     phase: "TRACK",   crew: "PLT" },
      { step: 5,  action: "Uncage seeker (half-action trigger or uncage button)",        phase: "EMPLOY",  crew: "PLT" },
      { step: 6,  action: "Listen for strong audio growl tone (seeker tracking)",        phase: "EMPLOY",  crew: "PLT" },
      { step: 7,  action: "Verify target within missile envelope (range, aspect)",       phase: "EMPLOY",  crew: "PLT" },
      { step: 8,  action: "Full trigger pull to launch missile",                          phase: "EMPLOY",  crew: "PLT" },
      { step: 9,  action: "Missile is fire-and-forget after launch",                      phase: "EMPLOY",  crew: "AUTO" },
      { step: 10, action: "Assess and maneuver for follow-up or egress",                  phase: "BREAK",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "AIM-9 is fire-and-forget: no radar guidance required after launch" },
      { type: "info",    text: "Seeker must be cooled for at least 3 minutes before engagement for best performance" },
      { type: "info",    text: "Growl tone changes pitch based on IR signal strength; strong growl = good track" },
      { type: "info",    text: "Can slave seeker to radar lock, or use independently in boresight mode" },
      { type: "tip",     text: "Rear hemisphere shots (target's exhaust) provide strongest IR signature" },
      { type: "tip",     text: "Sun, flares, and hot terrain can deceive the IR seeker" },
      { type: "warning", text: "Seeker may lock onto sun, flares, or other heat sources if not properly directed" },
      { type: "warning", text: "Minimum range approximately 0.5 NM; missile needs time to arm and track" },
      { type: "solo",    text: "SINGLE PLAYER: Radar lock is optional for AIM-9. If desired, command Jester BST lock via Radar menu. Seeker can also be used in boresight without radar lock." }
    ],

    radarSettings: {
      radarMode: {
        label: "Radar Mode (Optional)",
        range: "BST / RDR / CAGE / CAA",
        description: "BST (Boresight) for quick single-target lock. RDR for search-then-lock. Radar lock optional but slaves AIM-9 seeker to target.",
        crew: "WSO"
      }
    },

    attackProfile: {
      engagementRange: "1-5 NM (typical)",
      guidanceType: "Infrared Homing (Fire & Forget)",
      radarMode: "BST or RDR (optional)",
      seekerType: "Infrared (cooled)",
      typicalAltitude: "5,000-30,000 ft MSL",
      typicalSpeed: "Mach 0.6-1.2"
    }
  },

  // ================================================================
  // M61 VULCAN GUN - Air-to-Air Gunnery
  // ================================================================
  gun_aa: {
    id: "gun_aa",
    name: "M61 VULCAN GUN (A/A)",
    shortName: "GUN",
    category: "A/A Gun",
    description: "M61A1 Vulcan 20mm six-barrel rotary cannon with Lead Computing Optical Sight (LCOS). Radar provides range input for accurate lead computation. 6,000 rounds per minute.",
    diagram: "img/gun_aa_profile.svg",

    setup: [
      { step: 1, system: "DSCG",  action: "Sight Mode Knob",      setting: "A/A",              crew: "PLT" },
      { step: 2, system: "GUN",   action: "Weapon Select Knob",   setting: "GUN",              crew: "PLT" },
      { step: 3, system: "RADAR", action: "Radar Mode",           setting: "BST (Boresight)",   crew: "WSO" },
      { step: 4, system: "RADAR", action: "Radar Power",          setting: "OPR",              crew: "WSO" },
      { step: 5, system: "GUN",   action: "Gun Rate Switch",      setting: "HIGH (6000 rpm)",   crew: "PLT" },
      { step: 6, system: "AWC",   action: "Master Arm Switch",    setting: "ARM",              crew: "PLT" }
    ],

    execution: [
      { step: 1, action: "Close to gun range (2,000-3,000 ft ideal)",                      phase: "EMPLOY",  crew: "PLT" },
      { step: 2, action: "WSO achieve BST radar lock for range input to LCOS",              phase: "TRACK",   crew: "WSO", pilotNote: "Jester Radar > BST Lock, or use fixed reticle without lock" },
      { step: 3, action: "LCOS pipper appears on HUD showing computed lead angle",          phase: "EMPLOY",  crew: "AUTO" },
      { step: 4, action: "Maneuver to place LCOS pipper on target",                         phase: "EMPLOY",  crew: "PLT" },
      { step: 5, action: "Stabilize tracking solution; pipper steady on target",            phase: "EMPLOY",  crew: "PLT" },
      { step: 6, action: "Press trigger for short bursts (1-2 seconds)",                    phase: "EMPLOY",  crew: "PLT" },
      { step: 7, action: "Observe tracer impacts; adjust aim as needed",                    phase: "EMPLOY",  crew: "PLT" },
      { step: 8, action: "Break off to avoid collision or debris; assess damage",           phase: "BREAK",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "M61A1 carries 639 rounds; at 6,000 rpm that is approximately 6 seconds of sustained fire" },
      { type: "info",    text: "LCOS computes lead based on radar range, closure rate, and target angle-off" },
      { type: "info",    text: "Without radar lock, pipper defaults to fixed depressed reticle (backup mode)" },
      { type: "tip",     text: "Short bursts (1-2 sec) conserve ammunition and maintain accuracy" },
      { type: "tip",     text: "Ideal gun range is 1,500-3,000 ft; closer increases hit probability but collision risk" },
      { type: "warning", text: "Must break off before reaching minimum range to avoid debris and collision" },
      { type: "warning", text: "Gun gas ingestion can cause engine compressor stall at high altitude / low speed" },
      { type: "solo",    text: "SINGLE PLAYER: Command Jester BST lock for LCOS. Without radar lock, the pipper defaults to a fixed depressed reticle which can still be used effectively." }
    ],

    radarSettings: {
      radarMode: {
        label: "Radar Mode",
        range: "BST (Boresight)",
        description: "BST provides automatic lock on first target within boresight acquisition zone. Supplies range data to LCOS for lead computation.",
        crew: "WSO"
      }
    },

    attackProfile: {
      engagementRange: "1,500-3,000 ft (optimal)",
      guidanceType: "Lead Computing Optical Sight (LCOS)",
      radarMode: "BST (range input to LCOS)",
      seekerType: "N/A (gun)",
      typicalAltitude: "Any (visual range)",
      typicalSpeed: "Mach 0.5-0.9 (corner speed ideal)"
    }
  },

  // ================================================================
  // CAGE / CAA - ACM Quick Reaction Modes
  // ================================================================
  cage_caa: {
    id: "cage_caa",
    name: "CAGE / CAA",
    shortName: "CAGE/CAA",
    category: "ACM",
    description: "Quick-reaction Air Combat Maneuvering radar modes. CAGE: fixed boresight acquisition zone — locks first target within cone. CAA: Computer Auto Acquisition — vertical scan pattern, auto-locks first target detected. Both designed for close-in combat.",
    diagram: "img/cage_caa_profile.svg",

    setup: [
      { step: 1, system: "DSCG",  action: "Sight Mode Knob",       setting: "A/A",                  crew: "PLT" },
      { step: 2, system: "AWC",   action: "Weapon Select Knob",    setting: "RADAR, HEAT, or GUN",  crew: "PLT" },
      { step: 3, system: "RADAR", action: "Radar Power",           setting: "OPR",                  crew: "WSO" },
      { step: 4, system: "ACM",   action: "Radar Mode Switch",     setting: "CAGE or CAA",          crew: "WSO" },
      { step: 5, system: "AWC",   action: "Master Arm Switch",     setting: "ARM",                  crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "CAGE: WSO selects CAGE mode; radar searches in fixed boresight cone",   phase: "SEARCH",  crew: "WSO", pilotNote: "Jester Radar > CAGE Mode" },
      { step: 2,  action: "CAGE: Pilot points nose at target; radar auto-locks within cone",        phase: "TRACK",   crew: "PLT" },
      { step: 3,  action: "CAA: WSO selects CAA mode; radar scans vertical bar pattern",            phase: "SEARCH",  crew: "WSO", pilotNote: "Jester Radar > CAA Mode" },
      { step: 4,  action: "CAA: Radar auto-locks first target detected in scan volume",             phase: "TRACK",   crew: "AUTO" },
      { step: 5,  action: "Lock achieved; radar transitions to Single Target Track (STT)",          phase: "TRACK",   crew: "AUTO" },
      { step: 6,  action: "Employ selected weapon (AIM-7, AIM-9, or Gun) per weapon procedure",    phase: "EMPLOY",  crew: "PLT" },
      { step: 7,  action: "If lock lost: radar returns to CAGE/CAA acquisition scan",               phase: "SEARCH",  crew: "AUTO" },
      { step: 8,  action: "Break or re-engage as tactical situation requires",                      phase: "BREAK",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "CAGE: Fixed boresight cone approximately 7.5 degrees; pilot must point nose at target" },
      { type: "info",    text: "CAA: Vertical scan covers wider area; auto-locks first target found (friend or foe)" },
      { type: "info",    text: "Both modes transition to Single Target Track (STT) upon lock" },
      { type: "info",    text: "If lock is broken, radar automatically returns to the acquisition scan pattern" },
      { type: "tip",     text: "CAGE is best for targets you can already see; CAA for targets above or below your nose" },
      { type: "tip",     text: "Once locked, all weapons (AIM-7, AIM-9, GUN) receive radar data automatically" },
      { type: "warning", text: "CAA will lock the FIRST target found, which may not be the intended target" },
      { type: "warning", text: "IFF is critical in ACM; these modes lock indiscriminately" },
      { type: "solo",    text: "SINGLE PLAYER: Command Jester to select CAGE or CAA mode via the Radar wheel menu. Once selected, radar acquires automatically — pilot just points the nose." }
    ],

    radarSettings: {
      cageMode: {
        label: "CAGE Mode",
        range: "7.5-degree boresight cone",
        description: "Fixed acquisition zone along aircraft boresight axis. Radar locks first target within cone. Point nose at target and radar does the rest.",
        crew: "WSO"
      },
      caaMode: {
        label: "CAA Mode",
        range: "Vertical scan pattern, +/- 30 degrees",
        description: "Computer Auto Acquisition. Radar scans a vertical bar pattern and auto-locks first detected target. Wider search volume than CAGE.",
        crew: "WSO"
      }
    },

    attackProfile: {
      engagementRange: "0.5-5 NM (ACM)",
      guidanceType: "Auto-acquisition radar lock",
      radarMode: "CAGE / CAA",
      seekerType: "N/A (radar acquisition mode)",
      typicalAltitude: "Any (visual range)",
      typicalSpeed: "Mach 0.5-1.0 (maneuvering speed)"
    }
  },

  // ================================================================
  // RADAR INTERCEPT - Full Intercept Procedure
  // ================================================================
  radar_intercept: {
    id: "radar_intercept",
    name: "RADAR INTERCEPT",
    shortName: "INTCPT",
    category: "Intercept",
    description: "Complete radar intercept procedure from GCI/AWACS vectors through search, detection, identification, and engagement. Covers the full kill chain for BVR and transition to WVR combat.",
    diagram: "img/radar_intercept_profile.svg",

    setup: [
      { step: 1,  system: "RADAR", action: "Radar Power",              setting: "OPR",                   crew: "WSO" },
      { step: 2,  system: "RADAR", action: "Radar Mode",               setting: "RDR (Search)",          crew: "WSO" },
      { step: 3,  system: "RADAR", action: "Radar Range",              setting: "50 or 100 NM",          crew: "WSO" },
      { step: 4,  system: "RADAR", action: "Antenna Elevation",        setting: "Adjust for target alt", crew: "WSO" },
      { step: 5,  system: "RADAR", action: "Scan Switch",              setting: "WIDE or NARROW",        crew: "WSO" },
      { step: 6,  system: "RADAR", action: "Pulse Switch",             setting: "NORM or SHORT",         crew: "WSO" },
      { step: 7,  system: "DSCG",  action: "Sight Mode Knob",          setting: "A/A",                   crew: "PLT" },
      { step: 8,  system: "AWC",   action: "Weapon Select Knob",       setting: "RADAR (Sparrow)",       crew: "PLT" },
      { step: 9,  system: "INTCP", action: "IFF Mode/Code",            setting: "SET per mission brief", crew: "WSO" },
      { step: 10, system: "AWC",   action: "Master Arm Switch",        setting: "ARM (when cleared)",    crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "Receive GCI/AWACS vectors: heading, altitude, bogey BRAA",      phase: "SEARCH",  crew: "PLT" },
      { step: 2,  action: "Turn to assigned intercept heading; set ordered altitude",        phase: "SEARCH",  crew: "PLT" },
      { step: 3,  action: "WSO search with radar in RDR mode; sweep antenna elevation",     phase: "SEARCH",  crew: "WSO", pilotNote: "Jester searches automatically; adjust via Jester Radar menu" },
      { step: 4,  action: "WSO detect contact; call JUDY (own radar contact)",               phase: "DETECT",  crew: "WSO", pilotNote: "Jester will call out radar contacts" },
      { step: 5,  action: "WSO half-action to initiate angle track on target",               phase: "TRACK",   crew: "WSO", pilotNote: "Jester Radar > Lock Target" },
      { step: 6,  action: "WSO full-action to achieve range track (full STT lock)",          phase: "TRACK",   crew: "WSO", pilotNote: "Jester completes STT lock sequence" },
      { step: 7,  action: "Interrogate IFF; determine hostile/friendly/unknown",             phase: "SORT",    crew: "WSO", pilotNote: "Jester IFF > Interrogate" },
      { step: 8,  action: "Call MERGED / COMMIT / ABORT per ROE and threat assessment",      phase: "SORT",    crew: "PLT" },
      { step: 9,  action: "If COMMIT: employ AIM-7 at max range with valid shoot cues",     phase: "EMPLOY",  crew: "PLT" },
      { step: 10, action: "Transition to AIM-9 or GUN as range closes",                     phase: "EMPLOY",  crew: "PLT" },
      { step: 11, action: "Assess engagement results; SPLASH or re-engage",                  phase: "BREAK",   crew: "PLT" },
      { step: 12, action: "Egress or set up for next engagement as directed",                phase: "BREAK",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "JUDY: crew has own radar contact and no longer needs GCI vectors for that target" },
      { type: "info",    text: "BRAA: Bearing, Range, Altitude, Aspect — standard GCI target call format" },
      { type: "info",    text: "Angle track (half-action) provides azimuth/elevation; range track (full-action) adds range" },
      { type: "info",    text: "Pulse switch: NORM for long range detection, SHORT for better close-in resolution" },
      { type: "tip",     text: "Begin search at expected bogey altitude; sweep up/down if not found at called altitude" },
      { type: "tip",     text: "Transition weapons: AIM-7 at BVR, AIM-9 inside 5 NM, GUN inside 3,000 ft" },
      { type: "warning", text: "IFF interrogation is mandatory per ROE before weapons employment" },
      { type: "warning", text: "Do not break radar lock on AIM-7 targets until missile impacts or times out" },
      { type: "solo",    text: "SINGLE PLAYER: Jester handles all radar search, detection, tracking, and IFF operations. Command lock and IFF via the Jester Radar and IFF wheel menus. Pilot handles weapon transitions and employment." }
    ],

    radarSettings: {
      radarMode: {
        label: "Radar Mode",
        range: "RDR → STT (upon lock)",
        description: "Begin in RDR (Search with Nutation) for target acquisition. Transitions to Single Target Track (STT) upon full lock.",
        crew: "WSO"
      },
      scanSwitch: {
        label: "Scan Switch",
        range: "WIDE / NARROW",
        description: "WIDE for initial search (120-degree scan). NARROW for focused search on known bearing (60-degree scan).",
        crew: "WSO"
      },
      pulseSwitch: {
        label: "Pulse Switch",
        range: "NORM / SHORT",
        description: "NORM provides best max range detection. SHORT provides better resolution at close range. Select based on expected engagement distance.",
        crew: "WSO"
      },
      antennaElevation: {
        label: "Antenna Elevation",
        range: "-60 to +60 degrees",
        description: "Adjust antenna tilt to search at target's expected altitude. Sweep if contact not found at called altitude.",
        crew: "WSO"
      }
    },

    attackProfile: {
      engagementRange: "25+ NM (BVR) to merge",
      guidanceType: "Full kill chain (BVR → WVR)",
      radarMode: "RDR → STT",
      seekerType: "Multi-weapon (AIM-7 / AIM-9 / GUN)",
      typicalAltitude: "15,000-35,000 ft MSL",
      typicalSpeed: "Mach 0.85-1.4"
    }
  },

  // ================================================================
  // COLD START - General Procedure
  // ================================================================
  cold_start: {
    id: "cold_start",
    name: "COLD START",
    shortName: "START",
    category: "General",
    deliveryKnobPosition: null,
    description: "Full cold-start procedure from dark cockpit to engines running and ready for taxi. Covers pre-start checks, external/internal power, engine start sequence for both J79 engines, and essential systems verification.",
    diagram: "img/cold_start_profile.svg",
    sectionLabels: { diagram: "STARTUP SEQUENCE", execution: "STARTUP PROCEDURE" },

    setup: [
      { step: 1,  system: "SAFE",  action: "Ejection Seat Pins",           setting: "REMOVE & STOW",        crew: "BOTH" },
      { step: 2,  system: "SAFE",  action: "Canopy/Intake Covers",         setting: "REMOVED (ground crew)", crew: "BOTH" },
      { step: 3,  system: "ELEC",  action: "Generator Switches (both)",    setting: "OFF",                   crew: "PLT" },
      { step: 4,  system: "ENG",   action: "Throttles",                    setting: "OFF",                   crew: "PLT" },
      { step: 5,  system: "FLGHT", action: "Landing Gear Handle",          setting: "IN & DOWN",             crew: "PLT" },
      { step: 6,  system: "ELEC",  action: "Battery",                      setting: "ON (check voltage)",    crew: "PLT" },
      { step: 7,  system: "ELEC",  action: "External Power",               setting: "CONNECT & ON",          crew: "PLT" },
      { step: 8,  system: "WPNS",  action: "Master Arm Switch",            setting: "SAFE",                  crew: "PLT" },
      { step: 9,  system: "FUEL",  action: "Fuel Control Panel",           setting: "CHECK",                 crew: "PLT" },
      { step: 10, system: "FLGHT", action: "Anti-Skid Switch",             setting: "TEST then ON",          crew: "PLT" },
      { step: 11, system: "ECS",   action: "Oxygen Quantity",              setting: "CHECK QUANTITY",        crew: "PLT" },
      { step: 12, system: "NAV",   action: "INS Mode Knob",               setting: "STBY",                  crew: "WSO", pilotNote: "Start alignment early" },
      { step: 13, system: "COMM",  action: "ICS Panel",                    setting: "SET HOT MIC",           crew: "BOTH" },
      { step: 14, system: "ECS",   action: "Cabin Pressurization",         setting: "CHECK",                 crew: "WSO" },
      { step: 15, system: "COMM",  action: "UHF Radio",                    setting: "SET FREQ",              crew: "PLT" },
      { step: 16, system: "NAV",   action: "Navigation Computer",          setting: "STBY",                  crew: "WSO", pilotNote: "Jester Wheel > Nav" },
      { step: 17, system: "FLGHT", action: "Flight Controls",              setting: "FREE & CORRECT",        crew: "PLT" },
      { step: 18, system: "ENG",   action: "Engine Master Switches",       setting: "ON (both)",             crew: "PLT" },
      { step: 19, system: "ELEC",  action: "Circuit Breaker Panels",       setting: "CHECK ALL IN",          crew: "BOTH" }
    ],

    execution: [
      { step: 1,  action: "Confirm area clear and fire guard posted",                     phase: "POWER",  crew: "PLT" },
      { step: 2,  action: "External air source connect RIGHT engine",                     phase: "START",  crew: "PLT" },
      { step: 3,  action: "External airflow ON; monitor RPM rise",                        phase: "START",  crew: "PLT" },
      { step: 4,  action: "At 10% RPM: press and HOLD right ignition button",             phase: "START",  crew: "PLT" },
      { step: 5,  action: "Right throttle to HALF then IDLE; watch for lightoff (EGT rise)", phase: "START",  crew: "PLT" },
      { step: 6,  action: "Release ignition button at lightoff",                          phase: "START",  crew: "PLT" },
      { step: 7,  action: "At 45% RPM: stop external airflow",                            phase: "START",  crew: "PLT" },
      { step: 8,  action: "Check R engine: EGT 220-420°C, RPM 65±1%, Oil 12-50 PSI",     phase: "CHECKS", crew: "PLT" },
      { step: 9,  action: "Right generator ON; check voltage",                            phase: "CHECKS", crew: "PLT" },
      { step: 10, action: "Repeat start sequence for LEFT engine (steps 2-8)",            phase: "START",  crew: "PLT" },
      { step: 11, action: "Right generator cycle OFF/ON; bus tie open light OUT",         phase: "CHECKS", crew: "PLT" },
      { step: 12, action: "Disconnect external air and power",                            phase: "CHECKS", crew: "PLT" },
      { step: 13, action: "Hydraulic pressure within limits (L & R systems)",             phase: "CHECKS", crew: "PLT" },
      { step: 14, action: "Complete interior check; request taxi clearance",              phase: "TAXI",   crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Engine start sequence: RIGHT engine first, then LEFT. Right engine provides hydraulic power for left start." },
      { type: "info",    text: "Normal idle parameters: EGT 220-420°C, Fuel Flow 800-1400 pph, RPM 65±1%, Oil Pressure 12-50 PSI" },
      { type: "info",    text: "GPU (Ground Power Unit) recommended for cold start; cartridge start available as alternate method" },
      { type: "tip",     text: "Start INS alignment as early as possible (STBY → ALIGN) - full gyrocompass alignment takes ~5 minutes" },
      { type: "tip",     text: "Hot start indication: EGT exceeding 420°C during start sequence. Motor to clear, then retry." },
      { type: "warning", text: "Never place INS in ALIGN mode when switching generators ON - power interruption causes INS NO-GO" },
      { type: "warning", text: "Do not advance throttle past IDLE until engine parameters are stabilized and within limits" },
      { type: "solo",    text: "SINGLE PLAYER: Jester assists with rear cockpit pre-start checks. Use Jester menu to command WSO startup items. INS alignment can be shortened via Mission Editor option." }
    ],

    attackProfile: {
      startType: "External Air or Cartridge",
      groundPower: "GPU recommended for cold start",
      startTime: "~8-10 min cockpit-to-taxi"
    }
  },

  // ================================================================
  // NAV / INS ALIGNMENT - General Procedure
  // ================================================================
  nav_ins: {
    id: "nav_ins",
    name: "NAV / INS ALIGNMENT",
    shortName: "NAV",
    category: "Navigation",
    deliveryKnobPosition: null,
    description: "AN/ASN-63 Inertial Navigation System alignment and TACAN setup. Covers coarse (BATH) and fine (gyrocompass) alignment, present position entry, waypoint programming, and TACAN channel configuration.",
    diagram: "img/nav_ins_profile.svg",
    sectionLabels: { diagram: "ALIGNMENT PROCESS", execution: "ALIGNMENT PROCEDURE" },

    setup: [
      { step: 1,  system: "NAV",   action: "INS Mode Knob",                setting: "OFF → STBY (pause) → ALIGN",  crew: "WSO", pilotNote: "Jester Wheel > Nav" },
      { step: 2,  system: "NAV",   action: "Nav Computer Control Panel",   setting: "STBY",                         crew: "WSO" },
      { step: 3,  system: "NAV",   action: "Position Update Switch",       setting: "NORMAL",                       crew: "WSO" },
      { step: 4,  system: "NAV",   action: "Magnetic Variation Counter",   setting: "SET local variation",           crew: "WSO" },
      { step: 5,  system: "NAV",   action: "Position Counters (Lat/Long)", setting: "SET to aircraft position",     crew: "WSO" },
      { step: 6,  system: "NAV",   action: "Wind Knobs (Dir & Speed)",     setting: "SET if known",                 crew: "WSO" },
      { step: 7,  system: "TACAN", action: "TACAN Channel",                setting: "SET per mission brief",         crew: "WSO", pilotNote: "Jester Wheel > Nav > TACAN" },
      { step: 8,  system: "TACAN", action: "TACAN Mode",                   setting: "T/R (normal) or A/A REC",      crew: "WSO" },
      { step: 9,  system: "NAV",   action: "HSI Mode Switches",            setting: "NAV COMP or TACAN",            crew: "PLT" },
      { step: 10, system: "NAV",   action: "BDHI Bearing Pointers",        setting: "SET (#1 TACAN, #2 NAV COMP)",  crew: "PLT" },
      { step: 11, system: "DSCG",  action: "Heading Reference",            setting: "SYNC to compass",              crew: "PLT" },
      { step: 12, system: "NAV",   action: "Destination Coordinates",      setting: "SET per mission brief",        crew: "WSO" }
    ],

    execution: [
      { step: 1,  action: "Ensure aircraft is STATIONARY; wings extended (not folded)",          phase: "ALIGN",   crew: "WSO", pilotNote: "Do not taxi during alignment" },
      { step: 2,  action: "INS mode knob: OFF → STBY (pause momentarily) → ALIGN",              phase: "ALIGN",   crew: "WSO", pilotNote: "Jester Wheel > Nav > INS" },
      { step: 3,  action: "HEAT light illuminates; wait ~110 sec for extinguish",                phase: "ALIGN",   crew: "WSO" },
      { step: 4,  action: "ALIGN light illuminates STEADY: BATH alignment complete (~75 sec)",   phase: "ALIGN",   crew: "WSO" },
      { step: 5,  action: "Continue waiting: gyrocompass refinement in progress (~5 min total)",  phase: "ALIGN",   crew: "WSO" },
      { step: 6,  action: "ALIGN light FLASHING: full gyrocompass alignment complete",           phase: "VERIFY",  crew: "WSO" },
      { step: 7,  action: "Enter destination coordinates on Nav Computer",                       phase: "PROGRAM", crew: "WSO", pilotNote: "Jester Wheel > Nav > Waypoints" },
      { step: 8,  action: "Set TACAN channel and verify bearing/range on HSI",                   phase: "PROGRAM", crew: "WSO" },
      { step: 9,  action: "INS mode knob: ALIGN → NAV",                                         phase: "VERIFY",  crew: "WSO" },
      { step: 10, action: "Verify heading, position, and steering on HSI/BDHI",                  phase: "VERIFY",  crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Three alignment types: BATH (~75 sec, 5.5 NM/hr CEP), Stored Heading (~2 min, 3 NM/hr CEP), Gyrocompass (~5 min, 3 NM/hr CEP)" },
      { type: "info",    text: "TACAN provides bearing and range up to 390 NM (ground) or 200 NM (air-to-air). 126 channels available on X and Y bands." },
      { type: "info",    text: "Air-to-Air TACAN: set channel 63 above or below cooperating aircraft on same band (X/Y). Example: tanker on 123Y → set 60Y" },
      { type: "tip",     text: "Start INS alignment on battery power before engine start to maximize alignment time. BATH is available in ~75 seconds." },
      { type: "tip",     text: "Mission Editor 'Stored Heading' option significantly reduces alignment time by preserving previous alignment data" },
      { type: "warning", text: "Aircraft must be STATIONARY during alignment. Any movement degrades accuracy." },
      { type: "warning", text: "Do NOT switch to ALIGN while HEAT light is still on — this prevents gyrocompass alignment (BATH only)" },
      { type: "warning", text: "Inaccurate magnetic variation entry significantly extends gyrocompass alignment time (~5 min per degree of error)" },
      { type: "solo",    text: "SINGLE PLAYER: Jester handles INS alignment automatically when commanded. Use Jester Nav menu to set waypoints and TACAN." }
    ],

    insSettings: {
      alignmentTime: {
        label: "Alignment Time",
        range: "75 sec (BATH) to 5+ min (Gyrocompass)",
        description: "BATH provides rapid coarse alignment (5.5 NM/hr CEP). Gyrocompass provides full precision (3 NM/hr CEP). Stored Heading provides rapid fine alignment if prior alignment data exists.",
        crew: "WSO"
      },
      positionAccuracy: {
        label: "Position Accuracy (CEP)",
        range: "3.0 - 5.5 NM/hr",
        description: "Circular Error Probability per hour of flight. BATH: 5.5 NM/hr. Gyrocompass or Stored Heading: 3 NM/hr. Accuracy degrades over time; use TACAN or visual fixes for position updates.",
        crew: "WSO"
      },
      tacanChannels: {
        label: "TACAN Channels",
        range: "1-126, X or Y band",
        description: "Set per mission brief. T/R mode provides bearing and range. A/A REC provides bearing to air-to-air beacon. Air-to-air channel offset: ±63 channels, same band.",
        crew: "WSO"
      }
    },

    attackProfile: {
      alignmentTime: "75 sec (BATH) / 5 min (Gyrocompass)",
      positionAccuracy: "3.0 NM/hr CEP (gyrocompass)",
      tacanRange: "Up to 390 NM (ground station)"
    }
  },

  // ================================================================
  // LANDING & APPROACH - General Procedure
  // ================================================================
  landing_approach: {
    id: "landing_approach",
    name: "LANDING & APPROACH",
    shortName: "LAND",
    category: "Flight Ops",
    deliveryKnobPosition: null,
    description: "Standard visual landing pattern and approach procedure. Covers overhead break entry, configuration for landing (gear, slats, flaps), final approach on AoA, and touchdown. Reference optimum AoA: 19.2 units.",
    diagram: "img/landing_approach_profile.svg",
    sectionLabels: { diagram: "APPROACH PROFILE", execution: "APPROACH PROCEDURE" },

    setup: [
      { step: 1, system: "WPNS",  action: "Master Arm Switch",           setting: "SAFE",                    crew: "PLT" },
      { step: 2, system: "WPNS",  action: "External Stores",             setting: "JETTISON if required",     crew: "PLT" },
      { step: 3, system: "COMM",  action: "UHF Radio",                   setting: "SET tower frequency",      crew: "PLT" },
      { step: 4, system: "NAV",   action: "TACAN / ILS",                 setting: "SET for approach",         crew: "WSO", pilotNote: "Jester Wheel > Nav" },
      { step: 5, system: "FLGHT", action: "Anti-Skid Switch",            setting: "ON",                       crew: "PLT" },
      { step: 6, system: "FLGHT", action: "Slats/Flaps Switch",          setting: "NORM (until configured)",  crew: "PLT" },
      { step: 7, system: "FLGHT", action: "Speed Brake",                 setting: "As required for decel",    crew: "PLT" },
      { step: 8, system: "ECS",   action: "Cabin Pressurization",        setting: "CHECK",                    crew: "PLT" }
    ],

    execution: [
      { step: 1,  action: "Complete descent/before landing checks above 10,000 ft AGL",           phase: "CONFIG",  crew: "PLT" },
      { step: 2,  action: "Raise seat for improved forward visibility",                            phase: "CONFIG",  crew: "PLT" },
      { step: 3,  action: "Enter pattern at initial approach fix; 300-350 KIAS",                   phase: "PATTERN", crew: "PLT" },
      { step: 4,  action: "Overhead break: level break turn at pattern altitude (~1,500 ft AGL)",  phase: "PATTERN", crew: "PLT" },
      { step: 5,  action: "Decelerate on downwind; adjust power for gear-lowering airspeed",       phase: "PATTERN", crew: "PLT" },
      { step: 6,  action: "Landing gear DOWN; slats/flaps switch to OUT AND DOWN",                 phase: "PATTERN", crew: "PLT" },
      { step: 7,  action: "Verify: slats OUT, flaps DOWN (flaps extend below 210 KIAS)",          phase: "PATTERN", crew: "PLT" },
      { step: 8,  action: "Check: GEAR / FLAPS / HYD PRESSURE / WARNING LIGHTS / ANTI-SKID",      phase: "PATTERN", crew: "PLT" },
      { step: 9,  action: "Turn base; establish on-speed AoA (19.2 units, steady tone)",           phase: "FINAL",   crew: "PLT" },
      { step: 10, action: "Roll out on final; 2.5-3° glideslope (~700 fpm descent)",               phase: "FINAL",   crew: "PLT" },
      { step: 11, action: "Pitch controls AoA; power controls glideslope/rate of descent",         phase: "FINAL",   crew: "PLT" },
      { step: 12, action: "Cross-check computed airspeed against AoA for gross error detection",   phase: "FINAL",   crew: "PLT" },
      { step: 13, action: "At 20-30 ft AGL: ground effect causes nose-down; maintain pitch",       phase: "TDWN",    crew: "PLT" },
      { step: 14, action: "Touchdown at slight slow indication; deploy drag chute if available",   phase: "TDWN",    crew: "PLT" },
      { step: 15, action: "Aerobrake, then nosewheel steering; apply wheel brakes as needed",      phase: "TDWN",    crew: "PLT" }
    ],

    notes: [
      { type: "info",    text: "Optimum approach AoA: 19.2 units for all gross weights and normal slat/flap configurations" },
      { type: "info",    text: "AoA aural tones: STEADY medium pitch = on-speed; PULSED low pitch = too fast; PULSED high pitch = too slow" },
      { type: "info",    text: "Gear extension causes AoA to read ~1 unit high. Approach speeds account for this. Gear-up approach reads ~1 unit low." },
      { type: "info",    text: "2.5-3° glideslope produces ~700 fpm descent rate. Ground effect at 20-30 ft reduces sink rate at touchdown." },
      { type: "tip",     text: "Raise seat before entering pattern — limited forward visibility at high AoA" },
      { type: "tip",     text: "Gusty/crosswind or aft CG: use 17-unit AoA approach (faster, more authority)" },
      { type: "tip",     text: "Five-item final check: GEAR / FLAPS / HYD PRESSURE / WARNING LIGHTS / ANTI-SKID" },
      { type: "warning", text: "If flaps do not extend by 210 KIAS, check slats/flaps switch and hydraulic pressure" },
      { type: "warning", text: "Go-around: smoothly increase to MIL power (AB if needed); do NOT rotate until airspeed builds. Maintain on-speed AoA." },
      { type: "solo",    text: "SINGLE PLAYER: All approach and landing steps are pilot-controlled. No WSO interaction required. Jester will call out altitude on final if commanded." }
    ],

    approachSettings: {
      approachAoA: {
        label: "Approach AoA",
        range: "19.2 units (on-speed)",
        description: "Optimum AoA for all gross weights in normal slat/flap configuration. Use 17 units for gusty/crosswind conditions or aft CG loading. One AoA unit ≈ 0.95 degrees.",
        crew: "PLT"
      },
      approachSpeed: {
        label: "Approach Speed",
        range: "~145 KIAS (configuration dependent)",
        description: "On-speed airspeed varies with gross weight and configuration. Cross-check computed airspeed with AoA reading to detect gross errors. Flaps will not extend above 210 KIAS.",
        crew: "PLT"
      },
      glideslope: {
        label: "Glideslope",
        range: "2.5° - 3.0°",
        description: "Standard visual glideslope produces ~700 fpm descent rate. Controlled by power adjustments. At 20-30 ft AGL, ground effect reduces sink rate. Slight slow indication at touchdown is desirable.",
        crew: "PLT"
      }
    },

    attackProfile: {
      approachSpeed: "~145 KIAS (on-speed)",
      approachAoA: "19.2 units (steady tone)",
      touchdownSpeed: "~135 KIAS"
    }
  }
};

// Mode display order
const MODE_ORDER = [
  "dive_toss",
  "direct",
  "tgt_find",
  "dive_laydown",
  "laydown",
  "offset",
  "loft",
  "timed_ladd",
  "timed_os",
  "inst_os",
  "timed_level",
  "agm45",
  "__a2a_divider__",
  "aim7_sparrow",
  "aim9_sidewinder",
  "gun_aa",
  "cage_caa",
  "radar_intercept",
  "__gen_divider__",
  "cold_start",
  "nav_ins",
  "landing_approach"
];

// Solo pilot notes for WSO-crewed setup steps (by system)
// In single-player, these indicate how to accomplish WSO tasks from the front cockpit
const SOLO_PILOT_NOTES = {
  RADAR: "Jester Wheel > Radar commands",
  WRCS:  "Jester Wheel > WRCS, or rear cockpit",
  ARBCS: "Jester Wheel > ARBCS, or rear cockpit",
  TGP:   "Jester Wheel > TGP commands",
  NAV:   "Jester Wheel > Nav, or rear cockpit",
  MSL:   "Jester Wheel > Weapons",
  INTCP: "Jester Wheel > IFF",
  ACM:   "Jester Wheel > Radar commands",
  AWC:   "Jester Wheel > Weapons",
  // General procedures
  ELEC:  "Front cockpit circuit breakers",
  ECS:   "Front cockpit ECS panel",
  COMM:  "Jester Wheel > Comm",
  TACAN: "Jester Wheel > Nav > TACAN",
};

// System badge colors for setup checklist
const SYSTEM_COLORS = {
  DSCG:  { bg: "#4a5d23", fg: "#fff" },
  DELIV: { bg: "#5c4033", fg: "#fff" },
  NAV:   { bg: "#2f4f4f", fg: "#fff" },
  RADAR: { bg: "#4a3728", fg: "#fff" },
  WRCS:  { bg: "#8b0000", fg: "#fff" },
  WPNS:  { bg: "#556b2f", fg: "#fff" },
  ARBCS: { bg: "#6b3a2a", fg: "#fff" },
  TGP:   { bg: "#2f4f4f", fg: "#fff" },
  AWC:   { bg: "#4a5068", fg: "#fff" },
  MSL:   { bg: "#6a3050", fg: "#fff" },
  GUN:   { bg: "#5c4033", fg: "#fff" },
  ACM:   { bg: "#8b4513", fg: "#fff" },
  INTCP: { bg: "#2f3f6f", fg: "#fff" },
  // General procedures
  ELEC:  { bg: "#4a5068", fg: "#fff" },
  FUEL:  { bg: "#6b5b3a", fg: "#fff" },
  ENG:   { bg: "#8b4513", fg: "#fff" },
  HYD:   { bg: "#5c4033", fg: "#fff" },
  ECS:   { bg: "#2f4f4f", fg: "#fff" },
  COMM:  { bg: "#2f3f6f", fg: "#fff" },
  SAFE:  { bg: "#8b0000", fg: "#fff" },
  TACAN: { bg: "#4a3728", fg: "#fff" },
  FLGHT: { bg: "#556b2f", fg: "#fff" },
  APPR:  { bg: "#6a3050", fg: "#fff" }
};

// Execution phase colors
const PHASE_COLORS = {
  SETUP:   { bg: "#556b2f", fg: "#fff" },
  INGRESS: { bg: "#2f4f4f", fg: "#fff" },
  LOCK:    { bg: "#4a3728", fg: "#fff" },
  ATTACK:  { bg: "#8b0000", fg: "#fff" },
  RELEASE: { bg: "#8b4513", fg: "#fff" },
  EGRESS:  { bg: "#4a5d23", fg: "#fff" },
  TIMER:   { bg: "#6b5b3a", fg: "#fff" },
  PULLUP:  { bg: "#7a3b2e", fg: "#fff" },
  SEARCH:  { bg: "#2f3f6f", fg: "#fff" },
  DETECT:  { bg: "#4a5068", fg: "#fff" },
  TRACK:   { bg: "#4a3728", fg: "#fff" },
  SORT:    { bg: "#6b5b3a", fg: "#fff" },
  EMPLOY:  { bg: "#8b0000", fg: "#fff" },
  BREAK:   { bg: "#4a5d23", fg: "#fff" },
  // General procedure phases
  POWER:   { bg: "#4a5068", fg: "#fff" },
  START:   { bg: "#8b4513", fg: "#fff" },
  CHECKS:  { bg: "#556b2f", fg: "#fff" },
  TAXI:    { bg: "#6b5b3a", fg: "#fff" },
  ALIGN:   { bg: "#2f4f4f", fg: "#fff" },
  PROGRAM: { bg: "#4a3728", fg: "#fff" },
  VERIFY:  { bg: "#4a5d23", fg: "#fff" },
  CONFIG:  { bg: "#556b2f", fg: "#fff" },
  PATTERN: { bg: "#2f3f6f", fg: "#fff" },
  FINAL:   { bg: "#8b0000", fg: "#fff" },
  TDWN:    { bg: "#5c4033", fg: "#fff" }
};
