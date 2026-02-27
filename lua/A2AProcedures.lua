--[[
  F-4E Jester A2A Procedures Mod
  Main Behavior Module

  Registers the A2A Procedures wheel menu and handles
  procedure display events.
]]

local Class = require('base.Class')
local Behavior = require('base.Behavior')

-- Load the A2A wheel menu definitions and event handlers
-- at require-time so Wheel.AddItem and ListenTo run during
-- the init file loading phase (before mod_init callbacks).
require('ui.A2AMenu')

local A2AProcedures = Class(Behavior)

function A2AProcedures:Constructor()
  Behavior.Constructor(self)
  Log("[A2A Procedures] Behavior initialized")
end

function A2AProcedures:Tick()
end

A2AProcedures:Seal()
return A2AProcedures
