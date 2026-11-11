---
device_type: nitratax_sc
version: "latest"
label: "NITRATAX sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500

controller_labels:
  sc4500:
    sensor_setup: "Device menu"
---

## SENSOR SETUP

> Select SENSOR first if more than one sensor is attached.

- calibrate: CALIBRATE
  - factor: FACTOR
    > Correction factor for the measured value (possible settings 0.80–1.20, default 1).
  - offset: OFFSET
    > Adjustable from –250 to +250 mE for zero point correction (default 0).
  - offset_adjust: OFFSET ADJUST
    > Perform a zero point calibration.
  - one_sample_cal: 1 SAMPLE CAL
    > Perform a single point calibration.
  - cal_config: CAL CONFIG
    > Select OUTPUT MODE or CAL INTERVAL.
    - output_mode: OUTPUT MODE
      > Select the behavior of the outputs during calibration for zero point setting (Hold, Active, Transfer, Choice).
    - cal_interval: CAL INTERVAL
      > Enter number of days.
  - set_cal_deflt: SET CAL DEFLT
    > The instrument resets the settings to the default configuration.
- configuration: CONFIGURATION
  - edit_name: EDIT NAME
    > Can be edited as required (up to 10 characters).
  - parameter: PARAMETER
    > NOx-N or NO3 (eco only NOx-N).
  - meas_unit: MEAS UNIT
    > Unit for the measured result (possible settings: mg/l, ppm).
  - meas_interval: MEAS INTERVAL
    > eco/clear: 5, 6, 10, 12, 15, 20, 30 min; plus: 15, 20, 30 sec and 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 min.
  - response_time: RESPONSE TIME
    > Indication of the actual response time in counts (count x measuring interval = response time): eco 3–6, clear 1–6, plus 1–12 x MEAS INTERVAL.
  - cleaning: CLEANING
    > eco, clear: 1/MEASURE; plus: 1/MEASURE; 1, 2, 3, 5, 6, 10, 12, 15, 20, 30 min; 1, 2, 3, 4, 6, 12 h, 10:00 h.
  - wiper_mode: WIPER MODE
    > Wiping interval: select SINGLE, DOUBLE A-B-A or DOUBLE B-A-B.
  - bypass: BYPASS
    > YES/NO (plus and clear); YES is the setting for bypass application and inhibits wiper "extension".
  - test_maint_days: TEST/MAINT
    > Counter for customer service settings: 0–1000 days (180 days are recommended), 0 = service deactivated.
  - set_defaults: SET DEFAULTS
    > The instrument resets the settings to the default configuration.
- test_maint: TEST/MAINT
  - probe_info: PROBE INFO
    - probe_name: NITRATAX plus/eco/clear
      > Name of connected sensor.
    - location: LOCATION
    - serial_number: SERIAL NUMBER
      > Serial number of connected sensor.
    - range: RANGE
      > Measuring range corresponding to the measuring path.
    - path_length: PATH LENGTH
      > Width of the measuring path.
    - wiper_pn: WIPER P/N
      > Item number.
    - model_number: MODEL NUMBER
      > Item number.
    - software_vers: SOFTWARE VERS
      > Sensor software.
    - driver_vers: DRIVER VERS.
      > STRUCTURE, FIRMWARE, CONTENT.
    - production_date: PRODUCTION DATE
      > Production date.
  - cal_data: CAL DATA
    - cal_data_offset: OFFSET
      > Adjustable on the CALIBRATION menu.
    - cal_data_factor: FACTOR
      > Adjustable on the CALIBRATION menu.
    - cal_date: DATE
      > Date of the last change of OFFSET and/or FACTOR.
    - dext_100: DEXT 100%
      > Internal calibration data.
    - dext_50: DEXT 50%
      > Internal calibration data.
    - dext_25: DEXT 25%
      > Internal calibration data.
    - cal: CAL.
      > Internal calibration data.
    - cal_r: R
      > Internal calibration data.
    - cal_m: M
      > Internal calibration data.
    - cal_ir: IR
      > Internal calibration data.
    - cal_im: IM
      > Internal calibration data.
  - counters: COUNTERS
    - total_time: TOTAL TIME
      > Counter.
    - profile: PROFILE
      > Counter 50000–0-negative number; negative numbers create warning messages.
    - cal_check: CAL CHECK
      > Counter x days–0-negative number; negative numbers create warning messages.
    - service: SERVICE
      > Counter 180 days–0-negative number; negative numbers create warning messages.
    - seals: SEALS
      > Counter 365 days–0-negative number; negative numbers create warning messages.
    - shaftseal: SHAFTSEAL
      > Counter 500000–0-negative number; negative numbers create warning messages.
    - motor: MOTOR
      > Counter.
    - flash: FLASH
      > Counter.
  - maint_proc: MAINT. PROC.
    - replace_profile: REPLACE PROFILE
    - service_done: SERVICE DONE
      > ARE YOU SURE? Confirm to reset the settings to the default configuration, or press the BACK key to return to the MAINT. PROC. menu.
    - wipertest: WIPERTEST
      > Select WIPE, DRIVE OUT WIPER or MOTOR CURRENT.
      - wipe: WIPE
        > Wiping process.
      - drive_out_wiper: DRIVE OUT WIPER
        > Wiper profile extends; inhibited on flow-through versions.
      - motor_current: MOTOR CURRENT
        > Measurement during the wiping process (motor current < 100 mA).
    - signals: SIGNALS
      > ENTER = WIPE: confirm; average value target is < 100 mA, individual measured values are displayed.
      - w_pos: W.POS
        > Wiper position.
      - dext: DEXT
        > Delta extinction between EM and ER.
      - em: EM
        > Extinction measuring channel.
      - er: ER
        > Extinction reference channel.
      - signal_m: M
        > Measured level.
      - signal_r: R
        > Reference level.
      - signal_im: IM
        > Intensity measuring channel.
      - signal_ir: IR
        > Intensity reference channel.
      - moist: MOIST
    - maint_output_mode: OUTPUT MODE
      > Select ACTIVE, HOLD, TRANSFER or CHOICE.
