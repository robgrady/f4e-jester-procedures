--[[
  F-4E Jester A2G Procedures Mod
  Main Behavior Module

  Registers the A2G Procedures wheel menu and handles
  procedure display events.
]]

local Class = require('base.Class')
local Behavior = require('base.Behavior')

-- Load the A2G wheel menu definitions and event handlers
-- at require-time so Wheel.AddItem and ListenTo run during
-- the init file loading phase (before mod_init callbacks).
require('ui.A2GMenu')

local A2GProcedures = Class(Behavior)

function A2GProcedures:Constructor()
  Behavior.Constructor(self)
  Log("[A2G Procedures] Behavior initialized")
end

function A2GProcedures:Tick()
end

A2GProcedures:Seal()
return A2GProcedures
