--[[
  F-4E Jester General Procedures Mod
  Main Behavior Module

  Registers the General Procedures wheel menu and handles
  procedure display events.
]]

local Class = require('base.Class')
local Behavior = require('base.Behavior')

-- Load the General wheel menu definitions and event handlers
-- at require-time so Wheel.AddItem and ListenTo run during
-- the init file loading phase (before mod_init callbacks).
require('ui.GeneralMenu')

local GeneralProcedures = Class(Behavior)

function GeneralProcedures:Constructor()
  Behavior.Constructor(self)
  Log("[General Procedures] Behavior initialized")
end

function GeneralProcedures:Tick()
end

GeneralProcedures:Seal()
return GeneralProcedures
