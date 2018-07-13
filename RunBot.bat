@echo off
:: Change to this directory.
cd %~dp0

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& './runBot.ps1'"
