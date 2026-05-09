---
device_type: tu5x00sc
version: "1.43"
label: "TU5300 sc / TU5400 sc"
compatible_controllers:
  - sc200
  - sc4500
---

<!-- REVIEW: Firmware/software version not stated in this manual. Edition 6 / 08/2021 used as version proxy; set to "unknown" per instructions. -->
<!-- REVIEW: TU5300 sc and TU5400 sc share an identical menu structure. Differences in available option values are noted in item descriptions. One file covers both models. -->
<!-- REVIEW: The manual uses two top-level menu roots: SENSOR SETUP>TU5x00 sc and DIAGNOSTICS>TU5x00 sc. These are treated as separate H2 sections below. -->

## Sensor Setup

### Configure
> Select the location name, signal averaging, measurement units, resolution, bubble reject, logger interval, programmable button function and more.

- location: Location
  > Sets the name or location of the sample source shown on the measurement screen — 16 characters maximum; default is the serial number.
- signal_avg: Signal Average
  > When enabled, the turbidity reading is an average of values measured during the selected time interval. TU5300 sc options: 30–90 seconds; TU5400 sc options: 1–90 seconds (default: 30 seconds).
- meas_units: Measurement Units
  > Selects the measurement units shown on the controller display and recorded to the data log. TU5300 sc options: NTU, FNU, TE/F, EBC, FTU. TU5400 sc options: NTU, mNTU, FNU, mFNU, TE/F, EBC, FTU, mFTU. Default: NTU.
- resolution: Resolution
  > Selects the number of decimal places shown on the controller display. Options: 0.001 or 0.0001. TU5300 sc default: 0.001; TU5400 sc default: 0.0001.
- bubble_reject: Bubble Reject
  > Sets bubble reject to on (default) or off; when on, high turbidity readings caused by bubbles are not shown or saved to the data log.
- logger_interval: Logger Interval
  > Sets the frequency at which the turbidity reading is saved to the data log. Options: 5 s, 30 s, 1, 2, 5, 10 (default), 15, or 30 minutes.
- cleaning: Cleaning
  > Configures the optional automatic cleaning module settings; only shown when CLEANING MODULE is set to ON.
- set_defaults: Set Defaults
  > Sets the instrument settings to the factory defaults.
- button_function: Button Function
  > Sets the function of the programmable button. Options: SERVICE, LINK2SC, OFF (default). When CLEANING MODULE is ON, additional options START WIPE and WIPER REPLACE are available.
- flow_sensor: Flow Sensor
  > Enables or disables the flow signal on the measurement screen and DIAG/TEST > SIGNALS screen, and enables or disables flow signal warnings and errors. Set to ON when the optional flow sensor is installed (default: OFF).
- cleaning_module: Cleaning Module
  > Enables or disables the automatic cleaning module menu options. Set to ON when the optional automatic cleaning module is installed (default: OFF).
- auto_check: Auto-Check
  > Sets the time interval and sensitivity of the automatic system check; only shown when the instrument has the automatic system check option.
  - check_interval: Check Interval
    > Sets the time interval between automatic system checks. Options: OFF, 1, 2 (default), 3, 6, 12 hours, or 1 day.
  - sensitivity: Sensitivity
    > Sets the sensitivity of the automatic system check to vial condition. Options: HIGH or LOW (default).

### Calibration

#### Setup
> Select the calibration curve, calibration interval, output behavior during calibration and more.

- menu_guided_cal: Menu Guided
  > Sets menu-guided calibration to SEALED VIAL, SYRINGE, or OFF (default); calibration instructions show on the display when set to SEALED VIAL or SYRINGE.
- cal_curve: Cal Curve
  > Selects the type of standard and calibration curve (range). Options: STABLCAL 0–40 NTU (default, 1-point), STABLCAL 0–700 NTU (2-point), FORMAZIN 0–40 NTU (2-point), FORMAZIN 0–700 NTU (3-point), or CUSTOM (2- to 6-point, 0.02 to 700 NTU).
- ver_after_cal: Verification After Cal
  > Sets the instrument to start a verification immediately after calibration is complete — on or off.
- cal_reminder: Cal Reminder
  > Sets the time interval between calibrations; a reminder shows when calibration is due. Options: OFF (default), 1 day, 7 days, 30 days, or 90 days.
- output_mode_cal: Output Mode
  > Selects the output behavior during calibration. Options: ACTIVE, HOLD (default), or SET TRANSFER.
- cal_points: Cal Points
  > Sets the number of calibration points (2 to 6) when CAL CURVE is set to CUSTOM.
- set_fact_cal: Set Factory Cal
  > Sets the calibration settings to the factory defaults.

#### Start

- cal_start: Start
  > Starts the calibration procedure as configured in SETUP.

#### Cal Log

- cal_log: Cal Log
  > Shows the historical data for the last four calibrations.

### Verification

#### Setup

- menu_guided_ver: Menu Guided
  > Sets menu-guided verification to SEALED VIAL, SYRINGE, or OFF (default). Select SEALED VIAL for verification with the glass verification rod.
- define_std_val: Define Std Val
  > Measures the verification standard for later use during verification; results are recorded to the data log. For best results, measure the verification standard immediately after calibration.
- accept_unit: Accept. Unit
  > Sets the acceptance range for verification to a percentage or NTU value. Options: % or NTU (or mNTU).
- accept_range: Accept. Range
  > Sets the maximum difference permitted between the recorded and measured verification standard values during verification. Options: 1 to 99% or 0.015 to 100.00 NTU.
- verif_reminder: Verif Reminder
  > Sets the time interval between calibration verifications; a reminder shows when verification is due. Options: OFF (default), 1 day, 7 days, 30 days, or 90 days.
- output_mode_ver: Output Mode
  > Sets the output behavior during verification. Options: ACTIVE, HOLD (default), or SET TRANSFER.

#### Start

- ver_start: Start
  > Starts the verification procedure as configured in SETUP.

#### Verif Log

- verif_log: Verif Log
  > Shows the historical data for the last four verifications.

### Diag/Test

#### Sensor Info

- sensor_info: Sensor Info
  > Shows the sensor name, location, serial number, type (EPA or ISO), model number, software version, and measurement device version.

#### Signals

- signals: Signals
  > Shows real-time values for turbidity, flow rate, humidity set point, air system humidity and temperature, vial condition (condensation and clarity), vial status (installed or not), and the lid type installed.

#### Counters

- counters: Counters
  > Shows total operational time, remaining wiper cycles, vial installation/replacement date, vial cleaning date, calibration date, verification date, desiccant operational time and remaining life, air pump operational time, and date factory service was done.

#### Maintenance
> Starts menu-guided maintenance to replace or clean the vial, replace the wiper, or replace the desiccant cartridge.

- vial_cleaning: Vial Cleaning
  > Starts the menu-guided vial cleaning process; the instrument automatically saves the cleaning date after the last screen.
- vial_replacement: Vial Replacement
  > Starts the menu-guided vial replacement process; the date the vial was replaced is automatically saved after the last screen.
- output_mode_maint: Output Mode
  > Selects the output behaviour during maintenance (default: HOLD).
- fix_water_ingress: Fix Water Ingress
  > Starts the procedure to fix a water ingress error; requires installation of a new desiccant cartridge during the procedure.
- factory_service: Factory Service
  > For service use only.

### Link2SC
> Select the acceptance range permitted when process and laboratory measurements are compared with Link2SC.

- accept_unit_l2sc: Accept. Unit
  > Sets the units used to compare process and laboratory measurements. Options: %, NTU, or LAB (select LAB when the acceptance range is supplied by the laboratory instrument).
- accept_range_l2sc: Accept. Range
  > Sets the maximum difference permitted between process and laboratory measurements. Options: 1 to 50% (default: 10%); only shown when ACCEPT. UNIT is set to % or NTU.

## Diagnostics

### Reminder
> Shows all active reminder messages.

- reminder_list: Reminder List
  > Displays active reminders such as DRYER RANGE (desiccant low), PERFORM CAL (calibration due), PERFORM VER (verification due), and WIPER REPLACE (wiper replacement due).

### Warning List
> Shows all active warning messages.

- warning_list: Warning List
  > Displays active warnings including CLEANING MODULE, DESICCANT OLD, DRYER EXHAUS'D, HIGH FLOW, HUM PCB SC, LASER-TEMP HIGH, LASER-TEMP SENS, LOW FLOW, NO FLOW, NOT DRYING, PUMP, SENS.DRY: FUNC, TURB TOO HIGH, WIPER REPLACE, and VIAL CLARITY.

### Error List
> Shows all active error messages.

- error_list: Error List
  > Displays active errors including AUTOCHK. NO FUNC, CLEANING MODULE, EE RSRVD ERR, FLASH FAIL, HUMIDITY PCB, LASER TOO LOW, MEAS ELECTRONIC, PROC HEAD OPEN, TURB TOO HIGH, VIAL PRESENT, VIAL CLARITY, and WATER INGRESS.