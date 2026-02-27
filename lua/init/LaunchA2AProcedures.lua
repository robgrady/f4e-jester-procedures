--[[
  F-4E Jester A2A Procedures Mod - Initialization
  This file auto-executes on aircraft spawn.

  Place in: Saved Games/DCS_F4E/jester/mods/init/
]]

local A2AProcedures = require 'A2AProcedures'

mod_init[#mod_init + 1] = function(jester)
  jester.behaviors[A2AProcedures] = A2AProcedures:new()
  Log("[A2A Procedures] v2.0 registered with Jester")
end
