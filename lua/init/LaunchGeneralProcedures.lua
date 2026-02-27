--[[
  F-4E Jester General Procedures Mod - Initialization
  This file auto-executes on aircraft spawn.

  Place in: Saved Games/DCS_F4E/jester/mods/init/
]]

local GeneralProcedures = require 'GeneralProcedures'

mod_init[#mod_init + 1] = function(jester)
  jester.behaviors[GeneralProcedures] = GeneralProcedures:new()
  Log("[General Procedures] v2.0 registered with Jester")
end
