--[[
  F-4E Jester A2G Procedures - Wheel Menu Definitions
  Adds "A2G Procedures" menu tree to the Jester Wheel
  with sub-items for all 12 delivery modes.
]]

-- ============================================================
-- PROCEDURE TEXT DEFINITIONS
-- ============================================================

-- Helper to build formatted text blocks
local function heading(title)
  return title .. "\n" .. string.rep("=", #title)
end

-- ---- DIVE TOSS ----
local DT_SETUP = table.concat({
  heading("DIVE TOSS (DT) SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Delivery Mode .......... DT",
  " 3. [PLT] HSI Mode ............... NAV COMP",
  " 4. [WSO] Radar Mode ............. AIR-GRD",
  "         SOLO: Jester Radar menu",
  " 5. [WSO] Radar Range ............ 5/10 NM",
  " 6. [WSO] Radar Power ............ OPR",
  " 7. [WSO] Antenna Stab ........... NOR",
  " 8. [WSO] Drag Coefficient ....... SET",
  "         SOLO: Jester WRCS or rear cockpit",
  " 9. [WSO] Release Advance ........ SET if reqd",
  "10. [PLT] Weapon Select .......... BOMBS",
  "11. [PLT] AWRU ................... SET",
  "12. [PLT] Nose/Tail Arm .......... As reqd",
  "13. [PLT] Station Select ......... Select",
  "14. [PLT] Master Arm ............. ARM",
}, "\n")

local DT_ATTACK = table.concat({
  heading("DIVE TOSS (DT) ATTACK"),
  "1. WSO minimize receiver gain (MIN)",
  "   SOLO: Jester Radar > Gain MIN",
  "2. Initiate dive ~20% steeper than Direct",
  "3. WSO achieve radar ground lock",
  "   SOLO: Jester Radar > Lock Ground",
  "4. Maneuver pipper over target, wings level",
  "5. Press & HOLD bomb button",
  "6. Begin gentle pullout, wings level",
  "7. WRCS auto-releases at computed point",
  "8. Release bomb button after separation",
}, "\n")

local DT_SETTINGS = table.concat({
  heading("DIVE TOSS WRCS SETTINGS"),
  "DRAG COEFFICIENT: 0.00-9.99",
  "  Set from Bombing Calculator (RCtrl+B)",
  "",
  "RELEASE ADVANCE: 0-999 ms",
  "  RA = (N_Tgt - 1) x I_R",
}, "\n")

-- ---- DIRECT ----
local DIR_SETUP = table.concat({
  heading("DIRECT (MANUAL) SETUP"),
  "1. [PLT] Sight Mode ............. A/G",
  "2. [PLT] Reticle Depression ...... SET",
  "3. [PLT] Delivery Mode .......... DIRECT",
  "4. [PLT] Weapon Select .......... BOMBS",
  "5. [PLT] AWRU ................... SET",
  "6. [PLT] Nose/Tail Arm .......... As reqd",
  "7. [PLT] Station Select ......... Select",
  "8. [PLT] Master Arm ............. ARM",
}, "\n")

local DIR_ATTACK = table.concat({
  heading("DIRECT (MANUAL) ATTACK"),
  "1. Fly profile per bombing tables",
  "2. Establish dive angle, speed, altitude",
  "3. Hand-fly pipper onto target",
  "4. Press bomb button at planned altitude",
  "5. Initiate pullout and egress",
}, "\n")

-- ---- TGT FIND ----
local TF_SETUP = table.concat({
  heading("TARGET FIND SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Delivery Mode .......... TGT FIND",
  " 3. [PLT] HSI Mode ............... NAV COMP",
  " 4. [WSO] Nav Mode Selector ...... NAV COMP",
  "         SOLO: Jester Nav or rear cockpit",
  " 5. [WSO] INS Mode ............... NAV",
  " 6. [WSO] Pave Spike Power ....... ON/STBY",
  "         SOLO: Jester TGP commands",
  " 7. [WSO] Pave Spike Mode ........ TRACK",
  " 8. [WSO] TGT FIND Switch ........ HOLD",
  "         SOLO: Jester WRCS or rear cockpit",
  " 9. [WSO] Release Advance ........ SET if reqd",
  "10. [PLT] Weapon Select .......... BOMBS",
  "11. [PLT] AWRU ................... SET",
  "12. [PLT] Nose/Tail Arm .......... As reqd",
  "13. [PLT] Station Select ......... Select",
  "14. [PLT] Master Arm ............. ARM",
}, "\n")

local TF_ATTACK = table.concat({
  heading("TARGET FIND ATTACK"),
  "1. WSO place Pave Spike on target",
  "   SOLO: Jester TGP > Slave/Stabilize",
  "2. WSO activate laser for slant range",
  "   SOLO: Jester TGP > Laser On",
  "3. Fly toward target, wings level",
  "4. Press & HOLD bomb button",
  "5. Follow HUD steering cues",
  "6. Bombs release automatically",
  "7. Release bomb button after separation",
}, "\n")

-- ---- DIVE LAYDOWN ----
local DL_SETUP = table.concat({
  heading("DIVE LAYDOWN (DL) SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Delivery Mode .......... DL",
  " 3. [PLT] HSI Mode ............... NAV COMP",
  " 4. [WSO] Radar Mode ............. AIR-GRD",
  "         SOLO: Jester Radar menu",
  " 5. [WSO] Radar Range ............ 5/10 NM",
  " 6. [WSO] Radar Power ............ OPR",
  " 7. [WSO] Antenna Stab ........... NOR",
  " 8. [WSO] Release Range .......... SET",
  "         SOLO: Jester WRCS or rear cockpit",
  " 9. [WSO] Release Advance ........ SET if reqd",
  "10. [PLT] Weapon Select .......... BOMBS/RKTS",
  "11. [PLT] AWRU ................... SET",
  "12. [PLT] Nose/Tail Arm .......... As reqd",
  "13. [PLT] Station Select ......... Select",
  "14. [PLT] Master Arm ............. ARM",
}, "\n")

local DL_ATTACK = table.concat({
  heading("DIVE LAYDOWN (DL) ATTACK"),
  "1. Enter steep dive toward target",
  "2. WSO achieve radar lock",
  "   SOLO: Jester Radar > Lock Ground",
  "3. Position pipper on target",
  "4. Press & HOLD bomb button",
  "5. Level out at planned altitude",
  "6. Maintain speed/heading/wings level",
  "7. Auto release at set range",
  "8. Release bomb button after separation",
}, "\n")

-- ---- LAYDOWN ----
local LAY_SETUP = table.concat({
  heading("LAYDOWN (L) SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Reticle Depression ...... SET",
  " 3. [PLT] Delivery Mode .......... L",
  " 4. [PLT] HSI Mode ............... NAV COMP",
  " 5. [WSO] Target Range ........... IP-to-TGT",
  "         SOLO: Jester WRCS or rear cockpit",
  " 6. [WSO] Release Range .......... SET",
  " 7. [WSO] Release Advance ........ SET if reqd",
  " 8. [PLT] Weapon Select .......... BOMBS",
  " 9. [PLT] AWRU ................... SET",
  "10. [PLT] Nose/Tail Arm .......... As reqd",
  "11. [PLT] Station Select ......... Select",
  "12. [PLT] Master Arm ............. ARM",
}, "\n")

local LAY_ATTACK = table.concat({
  heading("LAYDOWN (L) ATTACK"),
  "1. Depress sight for target over IP",
  "2. Fly level over IP at planned alt/speed",
  "3. Cross IP; hold bomb button at target",
  "4. WRCS calculates distance via INS",
  "5. Maintain heading/speed/altitude",
  "6. Auto release at Release Range",
  "7. Release bomb button after separation",
}, "\n")

-- ---- OFFSET ----
local OFS_SETUP = table.concat({
  heading("OFFSET BOMB SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Delivery Mode .......... OFF SET",
  " 3. [PLT] HSI Mode ............... NAV COMP",
  " 4. [WSO] Nav Mode ............... NAV COMP",
  "         SOLO: Jester Nav or rear cockpit",
  " 5. [WSO] INS Mode ............... NAV",
  " 6. [WSO] Target Dist N/S ........ SET",
  "         SOLO: Jester WRCS or rear cockpit",
  " 7. [WSO] Target Dist E/W ........ SET",
  " 8. [WSO] ALT RANGE (IP alt) ..... SET MSL",
  " 9. [WSO] Release Range .......... SET",
  "10. [WSO] Release Advance ........ SET if reqd",
  "11. [WSO] TGT FIND Switch ........ HOLD",
  "12-16. [WSO] Radar setup for RIP",
  "         SOLO: Jester Radar menu",
  "17. [PLT] Weapon Select .......... BOMBS",
  "18. [PLT] AWRU ................... SET",
  "19. [PLT] Nose/Tail Arm .......... As reqd",
  "20. [PLT] Station Select ......... Select",
  "21. [PLT] Master Arm ............. ARM",
}, "\n")

local OFS_ATTACK = table.concat({
  heading("OFFSET BOMB ATTACK"),
  "VIP: Overfly visual IP",
  "RIP: Acquire radar return of known point",
  "  1. Position Along Track cursor",
  "  2. Slew Cross Track cursor over RIP",
  "     SOLO: Jester handles cursors",
  "  3. WSO push FREEZE",
  "     SOLO: Jester Offset > Freeze",
  "  4. WSO push TARGET INSERT",
  "     SOLO: Jester Offset > Target Insert",
  "  5. Follow steering to release point",
  "  6. Press & HOLD bomb button",
  "  7. Pull-up light = release",
  "  8. Release bomb button",
}, "\n")

-- ---- LOFT ----
local LOFT_SETUP = table.concat({
  heading("LOFT SETUP"),
  " 1. [PLT] Sight Mode ............. A/G",
  " 2. [PLT] Delivery Mode .......... LOFT",
  " 3. [WSO] Antenna Stab ........... NOR",
  "         SOLO: Jester ARBCS or rear cockpit",
  " 4. [WSO] LOW ANGLE .............. SET",
  " 5. [WSO] PULL-UP Timer .......... SET",
  " 6. [WSO] RELEASE Timer .......... 0.0",
  " 7. [PLT] Weapon Select .......... BOMBS",
  " 8. [PLT] AWRU ................... SET",
  " 9. [PLT] Nose/Tail Arm .......... As reqd",
  "10. [PLT] Station Select ......... Select",
  "11. [PLT] Master Arm ............. ARM",
}, "\n")

local LOFT_ATTACK = table.concat({
  heading("LOFT ATTACK"),
  "1. Fly level toward IP",
  "2. At IP, press & HOLD bomb button",
  "3. Timer counts down",
  "4. Audio tone = initiate 4G pull-up",
  "5. Keep ADI horizontal needle centered",
  "6. Auto release at LOW gyro angle",
  "7. Release bomb button after separation",
  "8. Continue pull/roll to egress",
}, "\n")

-- ---- TIMED LADD ----
local TLAD_SETUP = table.concat({
  heading("TIMED LADD (T LAD) SETUP"),
  "1. [PLT] Sight Mode ............. A/G",
  "2. [PLT] Delivery Mode .......... T LAD",
  "3. [WSO] PULL-UP Timer .......... SET",
  "   SOLO: Jester ARBCS or rear cockpit",
  "4. [WSO] RELEASE Timer .......... SET",
  "5. [PLT] Weapon Select .......... BOMBS",
  "6. [PLT] AWRU ................... SET",
  "7. [PLT] Nose/Tail Arm .......... As reqd",
  "8. [PLT] Station Select ......... Select",
  "9. [PLT] Master Arm ............. ARM",
}, "\n")

local TLAD_ATTACK = table.concat({
  heading("TIMED LADD ATTACK"),
  "1. Fly level toward IP",
  "2. At IP, press & HOLD bomb button",
  "3. Pull-up timer counts down",
  "4. Audio tone = initiate 3.5G pull-up",
  "5. Maintain 3.5G to 45-deg pitch",
  "6. Release timer begins after tone",
  "7. Auto release at timer expiration",
  "8. Release bomb button; escape maneuver",
}, "\n")

-- ---- TIMED O/S ----
local TOS_SETUP = table.concat({
  heading("TIMED O/S SETUP"),
  "1. [PLT] Sight Mode ............. A/G",
  "2. [PLT] Delivery Mode .......... O/S",
  "3. [WSO] HIGH ANGLE ............. SET >90 deg",
  "   SOLO: Jester ARBCS or rear cockpit",
  "4. [WSO] PULL-UP Timer .......... SET",
  "5. [PLT] Weapon Select .......... BOMBS",
  "6. [PLT] AWRU ................... SET",
  "7. [PLT] Nose/Tail Arm .......... As reqd",
  "8. [PLT] Station Select ......... Select",
  "9. [PLT] Master Arm ............. ARM",
}, "\n")

local TOS_ATTACK = table.concat({
  heading("TIMED O/S ATTACK"),
  "1. Fly level toward IP",
  "2. At IP, press & HOLD bomb button",
  "3. Tone + Pull-Up Lamp = maneuver",
  "4. Initiate 4G wings-level Immelmann",
  "5. Keep ADI needle centered",
  "6. Auto release at HIGH angle (>90 deg)",
  "7. Release bomb button after separation",
  "8. Complete Immelmann; roll wings level",
}, "\n")

-- ---- INST O/S ----
local IOS_SETUP = table.concat({
  heading("INST O/S SETUP"),
  "1. [PLT] Sight Mode ............. A/G",
  "2. [PLT] Delivery Mode .......... INST O/S",
  "3. [WSO] HIGH ANGLE ............. SET >90 deg",
  "   SOLO: Jester ARBCS or rear cockpit",
  "4. [PLT] Weapon Select .......... BOMBS",
  "5. [PLT] AWRU ................... SET",
  "6. [PLT] Nose/Tail Arm .......... As reqd",
  "7. [PLT] Station Select ......... Select",
  "8. [PLT] Master Arm ............. ARM",
}, "\n")

local IOS_ATTACK = table.concat({
  heading("INST O/S ATTACK"),
  "1. Fly directly over target",
  "2. Press & HOLD bomb button over target",
  "3. IMMEDIATELY initiate 4G Immelmann",
  "4. Keep ADI needle centered",
  "5. Auto release at HIGH angle (>90 deg)",
  "6. Release bomb button after separation",
  "  NO IP OR TIMER REQUIRED",
}, "\n")

-- ---- TIMED LEVEL ----
local TL_SETUP = table.concat({
  heading("TIMED LEVEL (TL) SETUP"),
  "1. [PLT] Sight Mode ............. A/G",
  "2. [PLT] Delivery Mode .......... TL",
  "3. [WSO] PULL-UP Timer .......... SET (calc)",
  "   SOLO: Jester ARBCS or rear cockpit",
  "4. [WSO] RELEASE Timer .......... 0.0",
  "5. [PLT] Weapon Select .......... BOMBS",
  "6. [PLT] AWRU ................... SET",
  "7. [PLT] Nose/Tail Arm .......... As reqd",
  "8. [PLT] Station Select ......... Select",
  "9. [PLT] Master Arm ............. ARM",
}, "\n")

local TL_ATTACK = table.concat({
  heading("TIMED LEVEL (TL) ATTACK"),
  "1. Calculate timer: dist / groundspeed",
  "   SOLO: Calc before flight; set via Jester",
  "2. Fly level toward IP",
  "3. At IP, press & HOLD bomb button",
  "4. Maintain straight level flight",
  "5. Auto release when timer = 0",
  "6. Release bomb button after separation",
  "",
  "NOTE: NO ADI guidance in TL mode",
  "Pilot must maintain wings level manually",
}, "\n")

-- ---- AGM-45 ----
local AGM_SETUP = table.concat({
  heading("AGM-45 SHRIKE SETUP"),
  "1. [PLT] Station Select ......... Loaded stn",
  "2. [PLT] Weapon Select .......... ARM",
  "3. [PLT] Delivery Mode .......... AGM-45",
  "4. [PLT] Sight Mode ............. A/G (opt)",
  "5. [WSO] ALT RANGE .............. TGT alt MSL",
  "   SOLO: Jester WRCS or rear cockpit",
  "6. [PLT] Flight Director ........ ON (opt)",
  "7. [PLT] Master Arm ............. ARM",
}, "\n")

local AGM_ATTACK = table.concat({
  heading("AGM-45 SHRIKE ATTACK"),
  "1. Fly toward radar emitter location",
  "2. Monitor ADI for steering (if FD on)",
  "3. Indexer: PULL-UP / LEVEL / DIVE",
  "4. Achieve LEVEL indication (in envelope)",
  "5. Direct sub-mode: 20+ deg dive",
  "6. Press weapon release to launch",
  "7. Break away from target area",
}, "\n")

-- ============================================================
-- MENU STRUCTURE
-- ============================================================

-- Helper to create a mode sub-menu with standard items
local function createModeMenu(name, setupAction, attackAction, settingsAction)
  local items = {
    Wheel.Item:new({
      name = "Setup Checklist",
      action = setupAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    }),
    Wheel.Item:new({
      name = "Attack Procedure",
      action = attackAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    }),
  }
  if settingsAction then
    items[#items + 1] = Wheel.Item:new({
      name = "System Settings",
      action = settingsAction,
      reaction = Wheel.Reaction.CLOSE_REMEMBER,
    })
  end
  return Wheel.Menu:new({ name = name, items = items })
end

-- Build sub-menus for each mode
local diveTossMenu  = createModeMenu("Dive Toss",    "a2g_dt_setup",   "a2g_dt_attack",   "a2g_dt_settings")
local directMenu    = createModeMenu("Direct",       "a2g_dir_setup",  "a2g_dir_attack",  nil)
local tgtFindMenu   = createModeMenu("TGT FIND",     "a2g_tf_setup",   "a2g_tf_attack",   nil)
local diveLayMenu   = createModeMenu("Dive Laydown",  "a2g_dl_setup",   "a2g_dl_attack",   "a2g_dl_settings")
local laydownMenu   = createModeMenu("Laydown",       "a2g_lay_setup",  "a2g_lay_attack",  "a2g_lay_settings")
local offsetMenu    = createModeMenu("Offset Bomb",   "a2g_ofs_setup",  "a2g_ofs_attack",  "a2g_ofs_settings")
local loftMenu      = createModeMenu("Loft",          "a2g_loft_setup", "a2g_loft_attack", "a2g_loft_settings")
local tladMenu      = createModeMenu("Timed LADD",    "a2g_tlad_setup", "a2g_tlad_attack", "a2g_tlad_settings")
local tosMenu       = createModeMenu("Timed O/S",     "a2g_tos_setup",  "a2g_tos_attack",  "a2g_tos_settings")
local iosMenu       = createModeMenu("Inst O/S",      "a2g_ios_setup",  "a2g_ios_attack",  "a2g_ios_settings")
local tlMenu        = createModeMenu("Timed Level",   "a2g_tl_setup",   "a2g_tl_attack",   "a2g_tl_settings")
local agmMenu       = createModeMenu("AGM-45 Shrike", "a2g_agm_setup",  "a2g_agm_attack",  nil)

-- Dive Delivery sub-menu
local diveDeliveryMenu = Wheel.Menu:new({
  name = "Dive Delivery",
  items = {
    Wheel.Item:new({ name = "Dive Toss (DT)",     action = "a2g_nav_dt",  menu = diveTossMenu }),
    Wheel.Item:new({ name = "Dive Laydown (DL)",   action = "a2g_nav_dl",  menu = diveLayMenu }),
    Wheel.Item:new({ name = "Direct (Manual)",     action = "a2g_nav_dir", menu = directMenu }),
  }
})

-- Level Delivery sub-menu
local levelDeliveryMenu = Wheel.Menu:new({
  name = "Level Delivery",
  items = {
    Wheel.Item:new({ name = "Laydown (L)",     action = "a2g_nav_lay", menu = laydownMenu }),
    Wheel.Item:new({ name = "Timed Level (TL)", action = "a2g_nav_tl",  menu = tlMenu }),
    Wheel.Item:new({ name = "Offset Bomb",      action = "a2g_nav_ofs", menu = offsetMenu }),
  }
})

-- Toss Delivery sub-menu
local tossDeliveryMenu = Wheel.Menu:new({
  name = "Toss Delivery",
  items = {
    Wheel.Item:new({ name = "Loft",        action = "a2g_nav_loft", menu = loftMenu }),
    Wheel.Item:new({ name = "Timed LADD",  action = "a2g_nav_tlad", menu = tladMenu }),
    Wheel.Item:new({ name = "Timed O/S",   action = "a2g_nav_tos",  menu = tosMenu }),
    Wheel.Item:new({ name = "Inst O/S",    action = "a2g_nav_ios",  menu = iosMenu }),
  }
})

-- Special Delivery sub-menu
local specialDeliveryMenu = Wheel.Menu:new({
  name = "Special",
  items = {
    Wheel.Item:new({ name = "TGT FIND (Pave Spike)", action = "a2g_nav_tf",  menu = tgtFindMenu }),
    Wheel.Item:new({ name = "AGM-45 Shrike",          action = "a2g_nav_agm", menu = agmMenu }),
  }
})

-- Main A2G Procedures menu - organized by delivery type
local a2gMenu = Wheel.Menu:new({
  name = "A2G Procedures",
  items = {
    Wheel.Item:new({ name = "Dive Delivery",  action = "a2g_nav_dive",  menu = diveDeliveryMenu }),
    Wheel.Item:new({ name = "Level Delivery", action = "a2g_nav_level", menu = levelDeliveryMenu }),
    Wheel.Item:new({ name = "Toss Delivery",  action = "a2g_nav_toss",  menu = tossDeliveryMenu }),
    Wheel.Item:new({ name = "Special",        action = "a2g_nav_spec",  menu = specialDeliveryMenu }),
  }
})

-- Add to main Jester Wheel
Wheel.AddItem(
  Wheel.Item:new({
    name = "A2G Procedures",
    action = "a2g_procedures_root",
    menu = a2gMenu,
  }),
  {}
)

-- ============================================================
-- EVENT HANDLERS
-- ============================================================

-- Helper to register setup/attack/settings handlers for a mode
local function registerHandlers(prefix, setupText, attackText, settingsText, menuPath)
  ListenTo(prefix .. "_setup", "a2g_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(setupText, menuPath)
    Log("[A2G] " .. prefix .. " setup displayed")
  end)

  ListenTo(prefix .. "_attack", "a2g_procedures", function(task)
    task:Roger()
    Wheel.SetMenuInfo(attackText, menuPath)
    Log("[A2G] " .. prefix .. " attack displayed")
  end)

  if settingsText then
    ListenTo(prefix .. "_settings", "a2g_procedures", function(task)
      task:Roger()
      Wheel.SetMenuInfo(settingsText, menuPath)
      Log("[A2G] " .. prefix .. " settings displayed")
    end)
  end
end

-- Register all mode handlers (organized by delivery type)
-- Dive Delivery
registerHandlers("a2g_dt",   DT_SETUP,   DT_ATTACK,   DT_SETTINGS,  {"A2G Procedures", "Dive Delivery", "Dive Toss (DT)"})
registerHandlers("a2g_dl",   DL_SETUP,   DL_ATTACK,   DL_SETUP,     {"A2G Procedures", "Dive Delivery", "Dive Laydown (DL)"})
registerHandlers("a2g_dir",  DIR_SETUP,  DIR_ATTACK,  nil,           {"A2G Procedures", "Dive Delivery", "Direct (Manual)"})
-- Level Delivery
registerHandlers("a2g_lay",  LAY_SETUP,  LAY_ATTACK,  LAY_SETUP,    {"A2G Procedures", "Level Delivery", "Laydown (L)"})
registerHandlers("a2g_tl",   TL_SETUP,   TL_ATTACK,   TL_SETUP,     {"A2G Procedures", "Level Delivery", "Timed Level (TL)"})
registerHandlers("a2g_ofs",  OFS_SETUP,  OFS_ATTACK,  OFS_SETUP,    {"A2G Procedures", "Level Delivery", "Offset Bomb"})
-- Toss Delivery
registerHandlers("a2g_loft", LOFT_SETUP, LOFT_ATTACK, LOFT_SETUP,   {"A2G Procedures", "Toss Delivery", "Loft"})
registerHandlers("a2g_tlad", TLAD_SETUP, TLAD_ATTACK, TLAD_SETUP,   {"A2G Procedures", "Toss Delivery", "Timed LADD"})
registerHandlers("a2g_tos",  TOS_SETUP,  TOS_ATTACK,  TOS_SETUP,    {"A2G Procedures", "Toss Delivery", "Timed O/S"})
registerHandlers("a2g_ios",  IOS_SETUP,  IOS_ATTACK,  IOS_SETUP,    {"A2G Procedures", "Toss Delivery", "Inst O/S"})
-- Special
registerHandlers("a2g_tf",   TF_SETUP,   TF_ATTACK,   nil,           {"A2G Procedures", "Special", "TGT FIND (Pave Spike)"})
registerHandlers("a2g_agm",  AGM_SETUP,  AGM_ATTACK,  nil,           {"A2G Procedures", "Special", "AGM-45 Shrike"})

Log("[A2G Procedures] v2.0 - 12 mode menus loaded")
