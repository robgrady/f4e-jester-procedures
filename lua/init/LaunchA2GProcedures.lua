--[[
  F-4E Jester A2G Procedures Mod - Initialization
  This file auto-executes on aircraft spawn.

  Place in: Saved Games/DCS_F4E/jester/mods/init/
]]

local A2GProcedures = require 'A2GProcedures'

mod_init[#mod_init + 1] = function(jester)
  jester.behaviors[A2GProcedures] = A2GProcedures:new()
  Log("[A2G Procedures] v2.0 registered with Jester")
end
