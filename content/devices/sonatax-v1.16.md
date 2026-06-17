---
device_type: sonatax_sc
version: "1.16"
label: "SONATAX"
compatible_controllers:
  - sc100
  - sc200
  - sc4500
  - sc1000
---

## Sensor Setup

### Wipe

- wipe: Wipe
  > Triggers a manual wipe cycle.

### Calibrate

- plungerdepth: Plunger Depth
  > Plunger depth of the probe underside. Configurable: 0.1 m to 3 m (0.3 ft to 9.8 ft).
- reflexlist: Reflex List
  > Shows the reflex list; a new measurement can be triggered. Lists all detected solid bodies that clearly reflected the ultrasonic impulse, with measurement depth in m or ft and signal strength as a percentage relative to the strongest signal.
- tank_depth: Tank Depth
  > Entry of the floor depth. Configurable: 1.00 m to 12 m (3.3 ft to 39.4 ft).
- profile_list: Profile List
  > A profile calculated from the ultrasound echo, shown as profile strength at corresponding depths. A new measurement can be triggered.
- adv_settings: ADV. Settings
  - factor: Factor
    > Correction factor for the speed of sound. Configurable: 0.3 to 3.0, default 1.0. Change only if the local speed of sound in the fluid deviates from water.
  - threshold_auto: Threshold Auto
    > Automatic threshold that constantly adapts to environmental conditions and adjusts sensitivity for maximum accuracy. Recommendation: 75%. Configurable: 1–95%.
  - ll_thresh_auto: LL Thresh. Auto
    > Gives the smallest possible value that the threshold can accept. Configurable: 0.1 to 1.0, recommendation 0.3.
  - fade_out: Fade-Out
    > Fades out a defined depth range so fixed installations or other influences at those depths are completely ignored. Configurable: ON, OFF.
    - begin: Begin
      > Upper limit of the range to be faded out. Only active when FADE-OUT = ON.
    - end: End
      > Lower limit of the range to be faded out. Only active when FADE-OUT = ON.
  - set_defaults_adv: Set Defaults
    > Resets all advanced settings to factory configuration after a security prompt.

### Configure

- edit_name: Edit Name
  > Freely editable sensor name, up to 16 characters. Factory setting: device number.
- parameter: Parameter
  > Selects whether the measurement result is shown as sludge level (distance from water surface) or sludge height (distance from tank floor). Configurable: sludge level, sludge height.
- meas_units: Meas Units
  > Dimension of the measurement result. Configurable: meters, feet.
- clean_interval: Clean. Interval
  > Wipe interval. Recommendation: 15 minutes. Configurable: 1 minute to 1 hour.
- response_time: Response Time
  > Damping of the measurement value. For high fluctuations, a high damping (e.g. 300 s) is recommended. Configurable: 10 to 1800 seconds.
- logger_interval: Logger Interval
  > Interval for the internal data log. Configurable: 1, 2, 3, 4, 5, 6, 10, 15, 30 minutes.
- set_defaults_cfg: Set Defaults
  > Resets all Configure menu items to factory configuration after a security prompt.

### Test / Maint

- probe_info: Probe Info
  - sensor_name: Sensor Name
    > Display of the device name.
  - edited_name: Edit Name
    > Display of the freely selectable measurement location (factory setting: device number).
  - serial_number: Serial Number
    > Device number.
  - model_number: Model Number
    > Item number of the sensor.
  - hardware_vers: Hardware-Vers
    > Production status of the main circuit board.
  - software_vers: Software-Vers
    > Sensor software version.
- counter: Counter
  - wiper_counter: Wiper Counter
    > Backward counter for wiping processes of the wiper profile. After expiration a warning message is shown; reset after wiper change.
  - total_time: Total Time
    > Operating hours counter.
  - motor: Motor
    > Forward counter for wiping processes.
- test_maint_date: Test / Maint
  > Date of the last performed maintenance.
- replace_profile: Replace Profile
  > Moves the wiper arm to a central position for wiper profile change so the arm can be removed and installed without problems.
- signals: Signals
  - moist: Moist
    > Indicator as to whether water is in the probe.
  - temperature: Temperature
    > Temperature of the surrounding water in °C or °F.
  - sensor_angle: Sensor Angle
    > Deviation of the probe axis from the perpendicular in degrees.
  - echo_list: Echo List
    > Shows the received echo signal in digits (AD converter units) at corresponding measurement depths; a new measurement can be started.
  - signals_profile_list: Profile List
    > Profile calculated from the ultrasound echo shown as profile strength at corresponding depths; a new measurement can be started.
  - signals_reflexlist: Reflex List
    > Shows the reflex list; a new measurement can be triggered.
  - frequency: Frequency
    > The resonance frequency of the ultrasound transducer.
  - ampl_diag: Ampl Diag
    > The resonance voltage of the ultrasound transducer.
  - threshold: Threshold
    > The threshold value used to determine the sludge level from the profile.
  - show_ampl: Show Ampl.
    > On activation, shows the resonance profile of the ultrasound transducer instead of the sludge profile as a graphic in the measurement window (sc1000 only). Can be switched ON and OFF.
