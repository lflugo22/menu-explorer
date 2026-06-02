---
device_type: an_ise_sc
version: "Latest"
label: "AN-ISE sc / AISE sc / NISE sc"
compatible_controllers:
  - sc200
  - sc4500
# REVIEW: The manual states "The probe can be used with all sc controllers" but lists no specific
# controller model slugs. Replace sc_controller with actual slugs (e.g. sc100, sc1000, sc200)
# once known. The manual specifically notes sc1000 by name (middle connection reserved for
# display module), so sc1000 is confirmed compatible.
# REVIEW: Firmware/software version not stated anywhere in the document.
# Document is DOC023.53.90137, Edition 7, 11/2021. Update version if known.
# REVIEW: This manual covers three probe variants with a shared menu structure:
#   AN-ISE sc (footnote 1) — measures NH4, NO3, K+, Cl–
#   AISE sc   (footnote 2) — measures NH4, K+ only (NO3/Cl electrodes deactivated)
#   NISE sc   (footnote 3) — measures NO3, Cl– only (NH4/K electrodes deactivated)
# Nodes that apply only to a subset of probes are marked with HTML comments below.
# Consider producing separate device_type entries (aise_sc, nise_sc) if the system
# needs to enforce per-variant menus at runtime.
---


## Sensor Setup

### Calibrate

- matrix_corr: MATRIX CORR
  > Matrix correction options; the most recently used menu is displayed. Currently active corrections are shown in INFORMATION.
  - none: NONE
    > No matrix correction is activated.
  - matrix_1: MATRIX 1
    > 1-point matrix correction.
    > AN-ISE sc, AISE sc, NISE sc — parameter options differ per probe; see sub-items
    - nh4_no3: NH4 + NO3
      > 1-point matrix correction for ammonium and nitrate.
      >AN-ISE sc only 
    - nh4: NH4
      > 1-point matrix correction for ammonium.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - no3: NO3
      > 1-point matrix correction for nitrate.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - nh4_k: NH4 + K
      > 1-point matrix correction for ammonium and potassium.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - no3_cl: NO3 + CL
      > 1-point matrix correction for nitrate and chloride.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - nh4_k_no3_cl: NH4+K NO3+CL
      > 1-point matrix correction for ammonium, potassium, nitrate and chloride.
      <!-- AN-ISE sc only (footnote 1) -->
    - take_sample: TAKE SAMPLE IMMEDIATELY AND ANALYSE IN LABORATORY
      > Information window: sample must be taken immediately and analysed in the laboratory.
  - value_corr_1: VALUE CORR. 1
    > Perform 1-point value correction; the most recently used menu is displayed.
    - vc1_nh4_n: NH4–N
      > Select ammonium as the parameter for the 1-point value correction.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - vc1_no3_n: NO3–N
      > Select nitrate as the parameter for the 1-point value correction.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - value_point: VALUE POINT
      > Enter the three values for the 1-point value correction.
      - an_ise_nh4_n: AN-ISE SC NH4–N
        > Enter the displayed ammonium value from the probe.
      - an_ise_k: AN-ISE SC K
        > Enter the displayed potassium value from the probe.
      - lab_nh4_n: LAB NH4–N
        > Enter the ammonium value measured in the laboratory.
      - entry_complete_vc1: ENTRY COMPLETE
        > Confirm the values entered to activate the correction.
      - corr_result_vc1: CORR-RESULT
        > Displays the correction results.
  - value_corr_2: VALUE CORR. 2
    > Perform 2-point value correction for higher accuracy over a wider concentration range.
    - vc2_nh4_n: NH4–N
      > Select ammonium as the parameter for the 2-point value correction.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - vc2_no3_n: NO3–N
      > Select nitrate as the parameter for the 2-point value correction.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - value_point_1: VALUE POINT 1
      > Enter the three values for the first correction point.
      - vp1_an_ise_nh4_n: AN-ISE SC NH4–N
        > Enter the displayed ammonium value from the probe (first point).
      - vp1_an_ise_k: AN-ISE SC K
        > Enter the displayed potassium value from the probe (first point).
      - vp1_lab_nh4_n: LAB NH4–N
        > Enter the ammonium laboratory value (first point).
      - vp1_entry_complete: ENTRY COMPLETE
        > Confirm the first correction point values.
    - value_point_2: VALUE POINT 2
      > Enter the three values for the second correction point.
      - vp2_an_ise_nh4_n: AN-ISE SC NH4–N
        > Enter the displayed ammonium value from the probe (second point).
      - vp2_an_ise_k: AN-ISE SC K
        > Enter the displayed potassium value from the probe (second point).
      - vp2_lab_nh4_n: LAB NH4–N
        > Enter the ammonium laboratory value (second point).
      - vp2_entry_complete: ENTRY COMPLETE
        > Confirm the second correction point values to activate the correction.
      - corr_result_vc2: CORR-RESULT
        > Displays the correction results.
  - further_corr: FURTHER CORR.
    > Additional matrix correction options.
    - none_fc: None
      > No FURTHER CORR. is activated.
    - matrix_2: MATRIX 2
      > 2-point matrix correction.
      - m2_nh4: NH4
        > Select ammonium as the parameter for the MATRIX 2 correction.
        <!-- AN-ISE sc only (footnote 1) -->
      - m2_no3: NO3
        > Select nitrate as the parameter for the MATRIX 2 correction.
        <!-- AN-ISE sc only (footnote 1) -->
      - meas_conc_1: MEAS CONC 1
        > Saves the currently measured value for the first correction point.
      - date_1: DATE
        > Displays the date of the current correction for the first point.
      - conc_labvalue_1: CONC. LABVALUE 1
        > Entry and display of the reference laboratory value for the first point.
      - meas_conc_2: MEAS CONC 2
        > Saves the currently measured value for the second correction point.
      - date_2: DATE
        <!-- REVIEW: two DATE nodes under MATRIX 2 (one per point); suffixed _1/_2 here to avoid duplicate keys -->
      - conc_labvalue_2: CONC. LABVALUE 2
        > Entry and display of the reference laboratory value for the second point.
      - hist_corr: HIST. CORR.
        > Select one of the last corrections performed.
    - sensor_code: SENSOR CODE
      > The sensor code can be activated or entered here.
      - activation: ACTIVATION
        > Activates the sensor code for individual channels.
        - act_nh4_k: NH4 + K
          > Activate the sensor code for ammonium and potassium.
          <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
        - act_no3_cl: NO3 + CL
          > Activate the sensor code for nitrate and chloride.
          <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
        - act_nh4_k_no3_cl: NH4+K NO3+CL
          > Activate the sensor code for all four channels.
          <!-- AN-ISE sc only (footnote 1) -->
        - factory_calibration: FACTORY CALIBRATION
          > Activates factory calibration (use if sensor code certificate is lost).
      - input: INPUT
        > Entry of the sensor code from the cartridge certificate.
- enter_corr: ENTER CORR.
  > The laboratory values of the last matrix correction can be changed here.
- enter_labvalue: ENTER LABVALUE
  > Enter laboratory values when MATRIX 1 or MATRIX 2 has been selected.
  > (Displayed when MATRIX 1 or MATRIX 2 is active.)
  - ammonium_lab: AMMONIUM
    > Entry of the ammonium laboratory value.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - nitrate_lab: NITRATE
    > Enter the laboratory value for nitrate.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
  - potassium_lab: POTASSIUM
    > Enter the laboratory value for potassium.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - chloride_lab: CHLORIDE
    > Enter the laboratory value for chloride.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
  - entry_complete_lab: ENTRY COMPLETE
    > Confirm the values entered.
  - corr_result_lab: CORR-RESULT
    > Display the correction results.
    - nh4_n_result: NH4–N
      > Displays whether or not the ammonium correction was successful.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - no3_n_result: NO3–N
      > Shows whether or not the nitrate correction was successful.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - k_result: K+
      > Displays whether or not the potassium correction was successful.
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - cl_result: CL
      > Displays whether or not the chloride correction was successful.
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
- information: INFORMATION
  > Information on the matrix correction used per parameter.
  - nh4_n_info: NH4–N
    > Matrix correction in use for ammonium.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - no3_n_info: NO3–N
    > Matrix correction in use for nitrate.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
  - k_info: K+
    > Matrix correction in use for potassium.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - cl_info: CL
    > Matrix correction in use for chloride.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->

### Configure

- edit_name: EDIT NAME
  > Enter or edit the sensor name; up to 10 alphanumeric characters.
- meas_units: MEAS UNITS
  > Select either mg/L or ppm as the measurement unit.
- parameters: PARAMETERS
  > Select NH4–N or NH4 and/or NO3–N or NO3 as the displayed parameter.
- temp_units: TEMP UNITS
  > Select °C or °F as the temperature unit.
- temp_offset: TEMP OFFSET
  > Enter a temperature offset value.
- response_time: RESPONSE TIME
  > Entry of the response time; range 30 sec to 300 sec.
- datalog_intrvl: DATALOG INTRVL
  > Select the data log interval: OFF, 30 sec, 1 min, 2 min, 5 min, 10 min, 15 min, 30 min. Factory default is 5 min.
- k_compensate: K+ COMPENSATE
  > Select automatic potassium compensation: On, Off, 0 (compensation OFF), or a fixed value 0.1–2000 mg/L.
  <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - set_k_conc: SET K+ CONC
    > Only shown when K+ COMPENSATE is OFF; enter a fixed potassium concentration.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
- cl_compensate: CL COMPENSATE
  > Select automatic chloride compensation: On, Off, 0 (compensation OFF), or a fixed value 0.1–2000 mg/L.
  <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
  - set_cl_conc: SET CL CONC
    > Only shown when CL COMPENSATE is OFF; enter a fixed chloride concentration.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
- factory_config: FACTORY CONFIG
  > Resets the configuration to the factory setting.

### Diag/Test

#### Sensor info

> Information on the connected sensor.

- sensor_name: SENSOR NAME
  > Name of the connected sensor.
- edit_name_diag: EDIT NAME
  > Serial number or name of the measurement location.
- serial_number: SERIAL NUMBER
  > Serial number of the connected sensor.
- sensor_type: SENSOR TYPE
  > Instrument designation of the connected sensor.
- code_vers: CODE VERS
  > Software version of the sensor.
- cal_data: CAL DATA
  > Data of the selected MATRIX correction and slope/offset information for individual channels.
  - cal_nh4_n: NH4–N
    > Matrix correction selected for ammonium.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - cal_no3_n: NO3–N
    > Matrix correction selected for nitrate.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
  - cal_k: K+
    > Matrix correction selected for potassium.
    <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
  - cal_cl: CL
    > Matrix correction selected for chloride.
    <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->

#### Signals

> Signals and measurement results of the individual measurement channels.

- sig_ammonium: AMMONIUM
  > Display the signals and measurement results for ammonium.
  <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
- sig_nitrate: NITRATE
  > Shows the signals and measurement results for nitrate.
  <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
- sig_potassium: POTASSIUM
  > Display the signals and measurement results for potassium.
  <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
- sig_chloride: CHLORIDE
  > Display the signals and measurement results for chloride.
  <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
- ref_electrode: REF. ELECTRODE
  > Displays the signals and measurement results for the reference system.
- mv_raw: MV RAW
  > Display the signals and measurement results for MV RAW.
- imped_status: IMPED STATUS
  > Display the signals and measurement results for impedance.
- sig_temp: TEMP
  > Display the signals and measurement results for temperature.
- sig_humidity: HUMIDITY
  > Display the signals and measurement results for humidity.
- sig_rfid: RFID
  > Display the signals and measurement results for RFID.

#### Cal days

> Shows the age of the last matrix correction per parameter.

- cal_days_nh4: AMMONIUM
  > Display the age of the last matrix correction for ammonium.
  <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
- cal_days_no3: NITRATE
  > Display the age of the last matrix correction for nitrate.
  <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->

#### Service

- test_cartridge: TEST CARTRIDGE
  > Perform a sensor check with the test cartridge.
  - test_ready: TEST CARTRIDGE READY? PRESS ENTER
  - test_result: TEST CARTRIDGE
    > Displays whether each individual sensor channel is OK or not.
    - tc_diag: DIAG/TEST
    - tc_gndrod: GNDROD
    - tc_ref: REF
    - tc_no3: NO3
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - tc_nh4: NH4
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - tc_orp: ORP
    - tc_cl: CL
      <!-- AN-ISE sc (footnote 1) and NISE sc (footnote 3) -->
    - tc_k: K+
      <!-- AN-ISE sc (footnote 1) and AISE sc (footnote 2) -->
    - tc_temp: TEMP
- change_cartr: CHANGE CARTR.
  > Follow the menu process to replace the sensor cartridge.
- cleaning: CLEANING
  > Follow the menu process to initiate a cleaning cycle.
