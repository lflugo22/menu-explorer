---
device_type: uvas_plus_sc
version: "Latest"
label: "UVAS plus sc"
compatible_controllers:
  - sc200
  - sc4500
# REVIEW: The manual states "The sensor can be operated with all sc controllers" but does not
# list specific controller model slugs. Replace sc_controller with the actual controller slugs
# (e.g. sc200, sc1000, sc4200) once known.
# REVIEW: Firmware/software version not stated on the title page or in any version table.
# Document is DOC023.54.03230, Edition 5, 1/2023. Update version if known.
---

## SENSOR SETUP

- select_sensor_setup: SELECT SENSOR
  > Shown only when more than one sensor is connected.

### CALIBRATION

- factor: FACTOR
  > Adjustable from 0.80–1.20 for matching comparison measurements.
- offset: OFFSET
  > Adjustable from -250 to +250 mE for zero point correction.
- zero_cal: ZERO CAL
  > Initiates zero point calibration using distilled water; see zero point calibration procedure.
- one_sample_cal: 1 SAMPLE CAL
  > Initiates 1-point calibration using a reference sample; see 1 point calibration procedure.
- verify: VERIFY
  > Initiates verification using a test glass filter; see verifying procedure.
- cal_config: CAL. CONFIG
  - output_mode: OUTPUT MODE
    > Defines the behaviour of the outputs during calibration or zero point setting.
    - active: ACTIVE
    - hold: HOLD
    - transfer: TRANSFER
  - selection: SELECTION
  - cal_interval: CAL INTERVAL
    > Counter for customer calibration interval; range 0–30 days, default 0 days.
  - set_cal_deflt: SET CAL DEFLT

### CONFIGURATION

- edit_name: EDIT NAME
  > Sensor name; maximum 10 characters.
- parameter: PARAMETER
  > Selectable parameters: SAK254, SAC254, Ext254, Abs254, T/cm, BODuv, BSBuv, CSBuv, CODuv, DOCuv, TOCuv, and others.
- meas_unit: MEAS UNIT
  > Selectable units: 1/m, mE, AU, %, mg/l, ppm.
- correlation: CORRELATION
  > Two value pairs for converting SAC254 to a total parameter (e.g. TOC); format: 1[1/m] and 1[mg/l] — 2[1/m] and 2[mg/l].
  - pair_1: PAIR 1
    - val_1_inv_m: 1 [1/m]
    - val_1_mg_l: 1 [mg/l]
  - pair_2: PAIR 2
    - val_2_inv_m: 2 [1/m]
    - val_2_mg_l: 2 [mg/l]
- reference: REFERENCE
  > Enables or disables the reference channel; ON/OFF.
- meas_interval: MEAS INTERVAL
  > Selectable intervals: 15, 20, 30 sec; 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 min.
- response_time: RESPONSE TIME
  > Range 1–12 × MEAS INTERVAL; displays the actual response time in minutes.
- cleaning: CLEANING
  > Wiper cleaning frequency; selectable: 1/measurement, 1, 2, 3, 5, 6, 10, 12, 15, 20, 30 min, 1, 2, 3, 4, 6, 12 h, 10:00h.
- wiper_mode: WIPER MODE
  > Selects the wiper movement pattern.
  - single: SINGLE
    > Normal setting; single wipe.
  - double_aba: DOUBLE A-B-A
    > Double wiping frequency pattern A-B-A.
  - double_bab: DOUBLE B-A-B
    > Double wiping frequency pattern B-A-B.
- bypass: BYPASS
  > Enables bypass mode (yes/no); forces WIPER MODE to B and inhibits wiper extension.
- set_defaults: SET DEFAULTS
  > Resets to factory configuration (MEAS INTERVAL: 5 min, RESPONSE TIME: 15 min, WIPER MODE: B-A-B).
  - are_you_sure: ARE YOU SURE?

### DIAG/TEST

<!-- REVIEW: The manual references DIAG/TEST as a top-level item under SENSOR SETUP in the
cleaning (5.2) and wiper profile (5.3) procedures, but it does not appear explicitly in the
Section 4.4 menu structure table. It has been included here as a sub-menu of sensor_setup
based on those procedural references. -->

#### TEST/MAINT

- replace_profile: REPLACE PROFILE
  > Initiates the wiper profile replacement procedure; see Changing wiper profile.
- wipertest: WIPERTEST
  - wipe: WIPE
    > Executes a wiping process.
  - drive_out_wiper: DRIVE OUT WIPER
    > Extends the wiper profile; inhibited on bypass versions.
  - motor_current: MOTOR CURRENT
    > Displays motor current in mA during the wiping process.
- signals: SIGNALS
  > Displays live sensor signals at 1 measurement per second.
  - average_value: Average value
  - individual_value: Individual measured value
  - single_value_aqs: Single measured value for AQS
    > Displayed with FACTOR = 1, OFFSET = 0.
  - w_pos: W.POS
    > Wiper position.
  - dext: DEXT
    > Delta extinction (EM – ER).
  - em: EM
    > Extinction measuring channel.
  - er: ER
    > Extinction reference channel.
  - m: M
    > Measured level.
  - r: R
    > Reference level.
  - im: IM
    > Intensity measuring channel.
  - ir: IR
    > Intensity reference channel.
  - rd: rd
    > Dark value reference.
  - md: md
    > Dark value measuring channel.
  - extd: extd
    > Dark value extinction.
  - moist: MOIST
    > Humidity / moisture indicator.
- output_mode_maint: OUTPUT MODE
  > Defines the behaviour of instrument outputs when the MAINT.PROC. menu is opened.

#### MAINT.PROC

> Displays output mode information and maintenance procedures.

- probe_info: PROBE INFO
  - instrument_name: UVAS plus sc
    > Instrument name display.
  - edit_name_info: EDIT NAME
  - serial_number: SERIAL NUMBER
  - filter_data: FILTER DATA
    > Measuring and reference wavelengths.
  - range: RANGE
  - pathlength: PATHLENGTH
    > Width of the measuring path.
  - wiper_pn: WIPER P/N
    > Wiper profile item number.
  - model_number: MODEL NUMBER
    > Instrument item number.
  - code_version: CODE VERSION
    > Sensor software version.
  - driver_vers: DRIVER VERS
  - production_date: PRODUCTION DATE
    > Production date of the sensor.
- cal_data: CAL. DATA
  - offset_cal: OFFSET
    > Adjustable on the CALIBRATION menu.
  - factor_cal: FACTOR
    > Adjustable on the CALIBRATION menu.
  - a_internal: a
    > Internal factor.
  - b_internal: b
    > Internal factor.
  - date_cal: DATE
    > Date of the last change of OFFSET and/or FACTOR.
  - std_3000: STD.: 3000 mE
    > Internal calibration data reference standard.
  - dext_100: DEXT 100%
    > Internal calibration data.
  - dext_50: DEXT 50%
    > Internal calibration data.
  - dext_25: DEXT 25%
    > Internal calibration data.
  - gain: GAIN
    > Instrument factor.
  - cal_date_factory: CAL.
    > Date of the last factory calibration.
  - r_internal: r
    > Internal calibration data.
  - m_internal: m
    > Internal calibration data.
  - ir_internal: ir
    > Internal calibration data.
  - im_internal: im
    > Internal calibration data.
- counters: COUNTERS
  - total_time: TOTAL TIME
    > Cumulative operating hours counter.
  - replace_profile_ctr: REPLACE PROFILE
    > Countdown counter from 50000 to 0; negative values indicate counter has elapsed.
  - check_calibr_ctr: CHECK CALIBR.
    > Counter for calibration check interval.
  - service_ctr: SERVICE
    > Countdown counter from 180 days to 0; negative values indicate counter has elapsed.
  - seals_ctr: SEALS
    > Countdown counter from 365 days to 0; negative values indicate counter has elapsed.
  - shaftseals_ctr: SHAFTSEALS
    > Countdown counter from 500000 to 0; negative values indicate counter has elapsed.
  - motor_ctr: MOTOR
    > Motor cycles counter.
  - flash_ctr: FLASH
    > Flash lamp cycles counter.