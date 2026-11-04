---
device_type: cl17sc
version: "latest"
label: "Ultra Low Range CL17sc"
compatible_controllers:
  - sc200
  - sc1000
  - sc4500
controller_labels:
  sc4500:
    "menu": "Device menu"
  sc200:
    "menu": "SENSOR SETUP"
    "menu.settings": "CONFIGURE"
    "menu.settings.edit_name": "EDIT NAME"
    "menu.settings.unit": "MEAS UNITS"
    "menu.settings.signal_average": "SIGNAL AVERAGE"
    "menu.settings.bubble_reject": "BUBBLE REJECT"
    "menu.settings.high_chlorine_alarm": "HIGH CL ALARM"
    "menu.settings.low_chlorine_alarm": "LOW CL ALARM"
    "menu.settings.sensor_info": "SENSOR INFO"
    "menu.settings.cl2_exposure": "CL2 EXPOSURE"
    "menu.settings.cl2_exposure.view_cl2_history": "VIEW CL2 HISTORY"
    "menu.settings.cl2_exposure.view_cl2_history.current_value": "CURRENT VALUE"
    "menu.settings.cl2_exposure.view_cl2_history.last_saved_value": "LAST SAVED VALUE"
    "menu.settings.cl2_exposure.set_exposure_limit": "SET EXPOSURE LIMIT"
    "menu.settings.cl2_exposure.reset_to_zero": "RESET TO ZERO"
    "menu.settings.reset": "DEFAULT SETTINGS"
    "menu.settings.service": "SERVICE"
    "menu.tasks": "menu.tasks"
    "menu.tasks.cell_cleaning": "CLEAN CELL"
    "menu.tasks.cell_cleaning.cell_hold": "HOLD"
    "menu.tasks.cell_cleaning.cell_transfer": "TRANSFER"
    "menu.tasks.replace_reagents": "CHANGE REAGENTS"
    "menu.tasks.replace_reagents.reagents_hold": "HOLD"
    "menu.tasks.replace_reagents.reagents_transfer": "TRANSFER"
    "menu.prime_reagents": "PRIME"
    "menu.grab_sample": "GRAB SAMPLE IN"
  sc1000:
    "menu": "SENSOR SETUP"
    "settings": "CONFIGURE"
    "menu.settings.edit_name": "EDIT NAME"
    "menu.settings.unit": "MEAS UNITS"
    "menu.settings.signal_average": "SIGNAL AVERAGE"
    "menu.settings.bubble_reject": "BUBBLE REJECT"
    "menu.settings.high_chlorine_alarm": "HIGH CL ALARM"
    "menu.settings.low_chlorine_alarm": "LOW CL ALARM"
    "menu.settings.sensor_info": "SENSOR INFO"
    "menu.settings.cl2_exposure": "CL2 EXPOSURE"
    "menu.settings.cl2_exposure.view_cl2_history": "VIEW CL2 HISTORY"
    "menu.settings.cl2_exposure.view_cl2_history.current_value": "CURRENT VALUE"
    "menu.settings.cl2_exposure.view_cl2_history.last_saved_value": "LAST SAVED VALUE"
    "menu.settings.cl2_exposure.set_exposure_limit": "SET EXPOSURE LIMIT"
    "menu.settings.cl2_exposure.reset_to_zero": "RESET TO ZERO"
    "menu.settings.reset": "DEFAULT SETTINGS"
    "menu.settings.service": "SERVICE"
    "menu.tasks": "menu.tasks"
    "menu.tasks.cell_cleaning": "CLEAN CELL"
    "menu.tasks.cell_cleaning.cell_hold": "HOLD"
    "menu.tasks.cell_cleaning.cell_transfer": "TRANSFER"
    "menu.tasks.replace_reagents": "CHANGE REAGENTS"
    "menu.tasks.replace_reagents.reagents_hold": "HOLD"
    "menu.tasks.replace_reagents.reagents_transfer": "TRANSFER"
    "menu.prime_reagents": "PRIME"
    "menu.grab_sample": "GRAB SAMPLE IN"
---

# Menu

<!-- REVIEW: Manual version/edition is "Edition 4, 04/2026"; no firmware version is printed. Using "latest". -->
<!-- REVIEW: On SC4500 the analyzer menu is "Device menu"; on SC200/SC1000 it is SENSOR SETUP > [select analyzer]. The Device menu / SENSOR SETUP level is treated as the root and is not a node. -->

## Settings
> Configuration menu for the analyzer.

- edit_name: Edit name
  > Sets the name of the analyzer. The name of the analyzer shows on the controller display and in the log files.
- unit: Unit
  > Sets the measurement units that show on the display. Options: ppb (default) or ppm.
- signal_average: Signal average
  > Sets the number of measurements used to calculate the average measurement shown on the display. Options: 1 (default), 2, 3, Irregular value.
- bubble_reject: Bubble reject
  > Sets the bubble reject option to Yes or No (default). Set to Yes to decrease noise caused by bubbles in the sample.
- high_chlorine_alarm: High chlorine alarm limit
  > Sets the chlorine concentration setpoint for the Chlorine is high alarm, 0.00 to 5.00 ppm (0 to 5000 ppb). Default: 0.10 ppm (100 ppb).
- low_chlorine_alarm: Low chlorine alarm limit
  > Sets the chlorine concentration setpoint for the Low chlorine alarm limit, 0.00 to 5.00 ppm (0 to 5000 ppb). Default: 0.00 ppm (0 ppb).
- sensor_info: Sensor information
  > Shows the analyzer serial number, software version, boot version and driver version.
- cl2_exposure: CL2 exposure
  - view_cl2_history: View CL2 history
    - current_value: Current value
      > The Cl2 exposure count on the home screen.
    - last_saved_value: Last saved value
      > The Cl2 exposure count saved when the Cl2 exposure count was set to zero. A maximum of three Cl2 exposure counts and their related start and end dates show on the display.
  - set_exposure_limit: Set the exposure limit
    > Sets the chlorine exposure alarm setpoint. Enter the membrane chlorine exposure limit supplied by the membrane manufacturer.
  - reset_to_zero: Reset to zero
    > Sets the CL2 exposure count on the home screen to zero and saves the last Cl2 exposure count to the View CL2 history screen.
- reset: Reset
  > Select Yes to change the configuration settings back to the factory default values.
- service: Service
  > For service use only.

## Standard tasks
> Standard maintenance tasks
- cell_cleaning: Cell cleaning
  - cell_hold: Hold last measurement value
    > The controller outputs are held at the last measured value.
  - cell_transfer: Transfer measurement value
    > The controller outputs change to the transfer value.
- replace_reagents: Replace reagents
  - reagents_hold: Hold last measurement value
    > The controller outputs are held at the last measured value.
  - reagents_transfer: Transfer measurement value
    > The controller outputs change to the transfer value.

## Prime reagents
> Fills the tubing with reagents and removes air from the tubing.

## Grab sample
> Adds a water sample or chlorine standard solution to the cell for measurement.
