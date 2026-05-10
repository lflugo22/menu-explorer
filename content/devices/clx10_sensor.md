---
device_type: cl10sc
version: "unknown"
label: "CL10sc Chlorine Sensor"
compatible_controllers:
  - sc200
  - sc4500
---

## Sensor Setup

### Configure
> Use the Configure menu to enter identification information and display options for the sensor and to change options for data handling and storage.

- edit_name: Edit Name
  > Changes the name that corresponds to the sensor on the top of the measure screen; limited to 10 characters; default is the sensor serial number.
- select_param: Select Param.
  > Customizes the options for sensor data handling and storage.
  - cl2_type: Chlorine Sensor Type
    > Select the type of chlorine sensor used — Total CL2 or Free CL2.
    - ph_used: pH Sensor Used
      > Select whether a pH sensor is used — Yes or No.
        - ph_type: pH Sensor Type
          > If a pH sensor is used, select the type — DIFF PH (pHD) or COMBO pH (pH combination).
            - configure_cl2: Chlorine
              > Customize the sensor parameters
              - select_units: Select Units
                > Sets the units for the sensor measurements — Auto ppb-ppm, Auto ug/L-mg/L, Fixed ppm, or Fixed mg/L.
              - display_format: Display Format
                > Sets the number of decimal places shown on the measure screen — X.XXX, XX.XX (default), XXX.X, or XXXX (Auto).
              - select_range: Select Range
                > Sets the measurement range — 0 to 10 ppm.
              - cal_watch: Cal Watch
                > Shown only if a pH sensor is used; sets alarm conditions for chlorine and/or pH measurement deviations.
                  - cal_monitor: Cal Monitor
                    > Select the measurement(s) to monitor for Cal Watch alarms.
                    - monitor_all: All
                      > Enables an error or warning alarm when chlorine and/or pH measurement deviations meet or exceed the selected deviation values.
                    - monitor_cl2: CL2 Only
                      > Enables an error or warning alarm when a chlorine measurement deviation meets or exceeds the selected chlorine deviation values.
                    - monitor_ph: pH Only
                      > Enables an error or warning alarm when a pH measurement deviation meets or exceeds the selected pH deviation values.
                    - monitor_none: None
                      > Disables all Cal Watch alarms.
                  - activate_tmr: Activate TMR
                    > Sets the amount of time a measurement can be outside the deviation range before an alarm occurs. 
                    - act_tmr_all: All
                      > ACTIVATE TMR: Sets the time the chlorine AND pH measurements can be out of range before an alarm occurs — 10 to 99 minutes (default 10 min). CONFID LEVEL: Sets the percentage rate at which chlorine AND pH measurements must be out of range before an alarm occurs and must be in range before auto-cancellation — 50 to 95% (default).
                    - act_tmr_cl2_ph: CL2/pH Only
                      > ACTIVATE TMR: Sets the time the chlorine OR pH measurements can be out of range before an alarm occurs — 10 to 999 minutes (default 30 min). CONFID LEVEL: Sets the percentage rate at which chlorine OR pH measurements must be out of range before an alarm occurs and must be in range before auto-cancellation — 50 to 95% (default).
                    - act_tmr_lcc: LCC
                      > ACTIVATE TMR: Sets the time a chlorine measurement can be 0.5 ppm or higher before an alarm occurs (only if the previous calibration used a low chlorine concentration process flow) — 10 to 999 minutes (default 30 min). CONFID LEVEL: Sets the percentage rate at which chlorine measurements must be ≥0.5 ppm before an alarm occurs and must be <0.5 ppm before auto-cancellation — 50 to 95% (default).
                  - deactivate_tmr: Deactivate Timer
                    > Sets the amount of time an alarm is on before it is automatically canceled if measurements return to range.
                    - deact_tmr_all: All
                      > Sets the time a chlorine AND pH deviation alarm is on before it is canceled — 10 to 99 minutes (default 30 min).
                    - deact_tmr_cl2_ph: CL2/pH Only
                      > Sets the time a chlorine OR pH deviation alarm is on before it is canceled — 10 to 999 minutes (default 30 min).
                    - deact_tmr_lcc: LCC
                      > Sets the time an LCC alarm is on before it is canceled — 10 to 999 minutes (default 30 min).
                  - cl2_deviation: CL2 Deviation
                    > Sets the chlorine measurement deviation values that activate alarms.
                    - cl2_err_dev: CL2 Error Deviation
                      > Sets the chlorine measurement deviation that activates an error alarm — 30 to 99% (default 50%).
                    - cl2_wrn_dev: CL2 Warning Deviation
                      > Sets the chlorine measurement deviation that activates a warning alarm — 10 to 30% (default 20%).
                  - ph_deviation: pH Deviation
                    > Sets the pH measurement deviation values that activate alarms.
                    - ph_err_dev: pH Error Deviation
                      > Sets the pH measurement deviation that activates an error alarm — 1 (default) to 3 pH units.
                    - ph_wrn_dev: pH Warning Deviation
                      > Sets the pH measurement deviation that activates a warning alarm — 0.5 (default) to 1 pH unit.
              - filter: Filter
                > Sets a time constant to increase signal stability; calculates the average value during a specified time — 0 (filtering disabled) to 60 seconds.
              - log_setup: Log Setup
                > Sets the time interval for event and data logging for chlorine concentration and flow status — 10 s, 30 s, 1 min, 5 min, 15 min (default), or 60 min.
            - configure_pH: pH
            - configure_temp: Temperature
- reset_defaults: Reset Defaults
  > Sets the configuration menu to the default settings; all sensor information is lost.

### Calibrate

#### Chlorine

- one_point_sample: 1 Point Sample
  > Performs a 1-point calibration using either a zero calibration or a process concentration measurement.
  - output_mode_1pt: Output Signal Mode
    > Sets the output signal behavior during calibration — Active, Hold, or Transfer.
  - zero_cal: Zero Cal
    > Performs a zero-point calibration.
    - electrical_1pt: Electrical
      > Removes the offset produced by the gateway to set the zero-point electronically (no sample used).
    - chemical_1pt: Chemical
      > Measures water with no chlorine to set the zero-point chemically.
  - process_conc_1pt: Process Conc
    > Measures the chlorine concentration of the process flow (grab sample analysis) and enters the measured value to set the calibration slope.
- two_point_sample: 2 Point Sample
  > Performs a 2-point calibration using a zero calibration and a process concentration measurement.
  - output_mode_2pt: Output Signal Mode
    > Sets the output signal behavior during calibration — Active, Hold, or Transfer.
  - cal_type_2pt: Calibration Type
    > Select the zero-point method — Electrical or Chemical.
    - electrical_2pt: Electrical
      > Removes the offset produced by the gateway for the zero-point, then measures the process sample to calculate slope.
    - chemical_2pt: Chemical
      > Measures water with no chlorine for the zero-point, then measures the process sample to calculate slope.
- reset_cal_defaults: Reset Defaults
  > Replaces the user calibration settings with the default calibration settings.
- cal_options: Cal Options
  > Sets calibration reminder, auto stabilization, and operator ID options.
  - auto_stab: Auto Stab
    > Enables automatic acceptance of the measurement signal when stable, advancing the calibration automatically — On or Off (default); stabilization range 25 to 75 ppb.
  - cal_reminder: Cal Reminder
    > Sets a reminder for the next calibration in days, months, or years.
  - op_id_on_cal: Operator ID on Cal
    > Includes an operator ID with calibration data — Yes or No (default); the ID is entered during calibration.

### Diag/Test
> The diagnostic and test menu shows current and historical information about the chlorine analyzer.

- gateway_info: Gateway Info
  > Shows the firmware version, driver version, serial number, and boot version for the controller and the types of sensors connected.
- cal_days: Cal Days
  > Shows the number of days since the sensor was last calibrated.
- cal_history: Cal History
  > Shows a list of the times when the sensor was calibrated; push ENTER to scroll through entries and view a summary of calibration data.
- rst_cal_history: Reset Cal History
  > Resets the sensor calibration history; requires passcode.
- signals: Signals
  > Shows the sensor measurement signal value in mV.
- sensor_days: Sensor Days
  > Shows the number of days the sensor has been in operation.
- rst_sensors: Reset Sensors
  > Resets the sensor days and calibration days to default; requires passcode.
- calibration: Calibration
  > Shows the slope and offset values for chlorine and pH (if pH sensor is used), and the temperature offset (if pH sensor is used).