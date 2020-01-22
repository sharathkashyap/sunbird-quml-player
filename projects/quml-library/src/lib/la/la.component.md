**la Component**

This component can be used to show Long Answer Questions in Quml Player. It receives questions and layout as Input() and emits component Loaded and options click event.

  

**Selector**: `quml-la`

  

  

**Exported as** : `LaComponent`

  

  

### Properties

  
| Name     |  Description  |
|----------|:-------------:|
| @Input() identifier |  Unique identifier for the question |
| @Input() questions | Dataset to display the Long answer questions in the Quml Player|    |
| @Input() layout: string | Layout to display the questions in different formats. Ex: Default, Column, Multiple|


  

### Events

| Name     |  Description  |
|----------|:-------------:|
| @Output() componentLoaded | Emits this event when user loads the component.|