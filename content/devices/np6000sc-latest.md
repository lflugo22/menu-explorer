---
device_type: np6000sc
version: "latest"
label: "NP6000sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc4500:
    menu: "Device menu"
  sc200:
    menu: "SENSOR SETUP"
  sc1000:
    menu: "SENSOR SETUP"
    calibration.auto_calibration: "AUTO. CALIBRATION"
    maintenance.prepumping.prepump_cleaning_solution: "CLEANING SOLUTION"
---
<!-- REVIEW: manual names SC200 only for home-screen navigation (section 4.1); menu paths are given only for SC1000 and SC4500. Remove sc200 if not confirmed. -->
<!-- REVIEW: the manual shows SC1000 labels in UPPERCASE as "(or LABEL)". Labels below use the SC4500 wording. Case-only differences are not listed in controller_labels; only wording differences are. -->
<!-- REVIEW: one menu covers 1-channel and 2-channel analyzers and Measurement ranges 1, 2 and 3. Availability notes from the manual are kept in descriptions. -->

# Menu

## Configuration

> Device menu > Configuration (SC4500) or SENSOR SETUP > NP6000sc > CONFIGURATION (SC1000).

- name: Name
  > Changes the name of the analyzer, limited to 16 characters.
- parameter: Parameter
  > Selects the measured parameter that shows on the display: PO4-P (default) or PO4.
- channel_1: Channel 1
  > Sets the location, parameter, number of measurements and discard measurements (only for 2-channel analyzer).
  - channel_1_location: Location
    > Changes the name of the location, limited to 16 characters.
  - channel_1_parameter: Parameter
    > Selects the measured parameter that shows on the display: PO4-P (default) or PO4.
  - channel_1_number_of_measurements: Number of measurements
    > Sets the number of measurements for channel 1.
  - channel_1_discard_measurements: Discard measurements
    > Sets the number of measurements that are discarded after a channel change and before the actual measurements start.
  - channel_1_sampling_configuration: Sampling configuration
    > Sets channel 1 to an internal, external or TMS filtration system.
    <!-- REVIEW: section 4.3 lists CHANNEL 1 INT (default), EXT and TMS; section 4.3.2 lists INT or EXT with EXT as default. Defaults conflict. -->
- channel_2: Channel 2
  > Sets the location, parameter, number of measurements and discard measurements (only for 2-channel analyzer).
  - channel_2_location: Location
    > Changes the name of the location, limited to 16 characters.
  - channel_2_parameter: Parameter
    > Selects the measured parameter that shows on the display: PO4-P (default) or PO4.
  - channel_2_number_of_measurements: Number of measurements
    > Sets the number of measurements for channel 2.
  - channel_2_discard_measurements: Discard measurements
    > Sets the number of measurements that are discarded after a channel change and before the actual measurements start.
- unit: Unit
  > Selects the measurement unit that shows on the display: mg/L (default) or ppm.
- output_mode: Output mode
  > Sets the values shown on the analog outputs when the analyzer is in maintenance mode: Hold (default), Active or Transfer.
- measurement_interval: Measurement interval
  > Selects the measurement interval of 5, 10 (default), 15, 20 or 30 minutes (2-channel devices: 5, 10 (default) or 15 minutes).
  <!-- REVIEW: section 1 specifications say the 5-minute interval is not available for Measurement range 1; table in 4.3 lists the options without that exception. -->
- sampling: Sampling
  > Sets the mode of operation for the internal sampling to On or Off (only for 1-channel analyzer and Measurement ranges 2 and 3).
- cleaning: Cleaning
  > Shows the start time of the automatic internal cleaning or of an installed TMS filtration system.
  - cleaning_interval: Cleaning
    > Sets the start time and the interval for an automatic cleaning: Off, 6, 12, 24 or 48 hours (default).
  - extended_cleaning: Extended cleaning
    > Sets the cleaning procedure of the overflow vessel and sample drain tubing to On or Off.
  - tms_cleaning: TMS cleaning
    > Sets the interval for an installed TMS filtration system: Off, 3, 6, 12, 24 (default) or 48 hours.
- seasonal_heating: Seasonal heating
  > Selects the starting and ending month for the operating time of the heated drain tubing.
- sample_flow_warning: Sample flow warning
  > Sets the warning level for the sample flow from 400 to 1400 mL/h (default 600 mL/h); only for variants with flow measurement (optional).
- maintenance_reminder: Maintenance reminder
  > Sets the maintenance reminder to 1, 3, 7, 14, 21 or 28 days.
- out_of_range_warning: Out of range warning
  > Sets the warning to On or Off when the measurement range limit is exceeded or not reached.
- reset_to_defaults: Reset to defaults
  > Sets the configuration settings to the factory defaults; the measurement range and counters are not reset.

## Calibration

> Device menu > Calibration (SC4500) or SENSOR SETUP > NP6000sc > CALIBRATION (SC1000). Calibration is only for Measurement range 1, except where noted.

- start_calibration_now: Start calibration now
  > Starts a calibration immediately (only for Measurement range 1).
- next_calibration: Next calibration
  > Shows the date and time when the next scheduled calibration starts (only for Measurement range 1).
- auto_calibration: Automatic calibration
  > Sets the automatic calibration settings (only for Measurement range 1).
  - start_time: Start time
    > Selects the time for the calibration to start.
  - interval: Interval
    > Selects the calibration interval: Off, 6, 12 or 24 hours.
    <!-- REVIEW: section 4.4.2 note says the recommended interval is "7 days (default)", which is not among the options listed in 4.4. -->
  - auto_next_calibration: Next calibration
    > Shows the date and time when the next scheduled calibration starts.
- last_calibration_value: Last calibration value
  > Shows the date and time, status, Standard Blank and temperature of the most recent calibration (only for Measurement range 1).
- grab_sample: Grab sample
  > Starts an automatic grab sample procedure when the grab sample option is available on the analyzer (optional).
  - start_grab_sample: Start grab sample
    > Fills a grab sample bottle with sample and analyzes the sample.
  - last_grab_sample: Last grab sample
    > Shows the date and time and value of the most recent grab sample.
- validation: Validation
  > Starts an automatic validation procedure when the validation option is available on the analyzer (optional).
  - start_validation: Start validation
    > Pre-pumps, flushes and measures the installed standard solution three times.
  - last_validation: Last validation
    > Shows the date and time and value of the most recent validation.
- factor: Factor
  > Sets the slope factor to adjust the standard calibration: 0.500 to 2.000 (default 1.000).
- offset: Offset
  > Sets the offset value to adjust the standard calibration: -5.00 to 5.00 mg/L (default 0.00).
- channel_1_correction: Channel 1 Correction
  > Sets the Location 1 name, Factor and Offset for channel 1 (only for 2-channel analyzers, Measurement ranges 2 and 3).
  - location_1: Location 1 name
    > Shows the name of location 1.
  - channel_1_factor: Factor
    > Sets the slope factor to adjust the standard calibration: 0.500 to 2.000 (default 1.000).
  - channel_1_offset: Offset
    > Sets the offset value to adjust the standard calibration: -5.00 to 5.00 mg/L (default 0.00).
- channel_2_correction: Channel 2 Correction
  > Sets the Location 2 name, Factor and Offset for channel 2 (only for 2-channel analyzers, Measurement ranges 2 and 3).
  - location_2: Location 2 name
    > Shows the name of location 2.
  - channel_2_factor: Factor
    > Sets the slope factor to adjust the standard calibration: 0.500 to 2.000 (default 1.000).
  - channel_2_offset: Offset
    > Sets the offset value to adjust the standard calibration: -5.00 to 5.00 mg/L (default 0.00).
- calibration_reset_to_defaults: Reset to defaults
  > Sets the calibration settings to the factory defaults.

## Maintenance

> Device menu > Maintenance (SC4500) or SENSOR SETUP > NP6000sc > MAINTENANCE (SC1000).

- current_status: Current status
  > Shows the current status of the analyzer.
- remaining_time: Remaining time
  > Shows the time that remains of the current process of the analyzer.
- start_maintenance_mode: Start maintenance mode / Start operational mode
  > Starts maintenance mode or operational mode, depending on the current mode of the analyzer.
- six_month_maintenance: 6-month maintenance
  > Starts the 6-month maintenance procedure with guided or non-guided instructions.
  - start_guided: Start guided
    > Starts the workflow with extensive instructions.
  - start_non_guided: Start non-guided
    > Starts the workflow with no instructions.
- maintenance_cleaning: Cleaning
  > Starts the automatic cleaning procedure, filter module cleaning workflow or sample tubing cleaning workflow.
  - automatic_cleaning: Automatic cleaning
    > Starts an automatic cleaning procedure of approximately 30 minutes in which all tubing and parts are flushed with cleaning solution.
  - filter_module_cleaning: Filter module cleaning
    > Gives guidance on how to clean the filter modules of the FX610 and FX620.
  - clean_sample_tubing: Sample tubing cleaning
    > Gives guidance on how to manually clean the sample tubing.
- prepumping: Prepumping
  > Starts the analyzer prepumping options.
  - prepump_all: Prepump all
  - prepump_cleaning_solution: Cleaning Solution 1&2
  - prepump_standard_blank: Standard Blank
    > Only for low range.
  - prepump_reagent: Reagent
    > Only for high range and mid range.
  - prepump_reagent_acid: Reagent & Acid
    > Only for low range.
  - prepump_sample: Sample
- replacements: Replacements
  > Starts the individual maintenance tasks with guided or non-guided instructions; the counter is set to zero after a workflow is completed.
  - air_filter_pads: Air filter pads
  - replace_reagent: Reagent
    > Only for high range and mid range.
  - replace_reagent_acid: Reagent & Acid
    > Only for low range.
  - replace_standard_blank: Standard Blank
    > Only for low range.
  - replace_cleaning_solution: Cleaning Solution 1&2
  - sample_pump_tubing: Sample pump tubing
    > Only for internal sampling.
  - piston_pump_head: Piston pump head
  - filter_module: Filter module
- air_tightness_test: Air tightness test
  > Starts an air tightness test to make sure that there are no leaks.
- reset_errors: Reset errors
  > Removes all errors.
- shutdown: Shutdown
  > Sets the analyzer to off for a short or an extended period of time.
  - shutdown_now: Shutdown
  - extended_shutdown: Extended shutdown
    - extended_shutdown_start_guided: Start guided
- factory_service: Factory service
  > Shows the factory service menu; a password is necessary.

## Diagnostics

> Device menu > Diagnostics (SC4500) or SENSOR SETUP > NP6000sc > DIAGNOSTICS (SC1000).

- device_information: Device information
  > Shows the device name, given name, location 1 and/or location 2, measurement range, serial number, part number, software and hardware versions.
- signals: Signals
  > Shows all of the functional conditions of the analyzer.
- counters: Counter
  > Shows the number of days when maintenance tasks are due.
