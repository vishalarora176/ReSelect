# Re-Select Component

This application is to demonstrate a reusable, configurable Select component
made from the scratch. The component is located at 'src/ui-components/select'.

![image](https://user-images.githubusercontent.com/18328084/116821768-d01ef300-ab98-11eb-92e8-0ec0b770b003.png) ![image](https://user-images.githubusercontent.com/18328084/116821905-9ac6d500-ab99-11eb-949d-cf45fecf7702.png)




## Usage

The component can be rendered using the below code

![image](https://user-images.githubusercontent.com/18328084/116821497-b4671d00-ab97-11eb-8f16-f7f7cc871ff1.png)


## Props 
1. "data" -> The data needs to be an array of objects. Each object should be of below structure
  {
    value: '<Value>',
    label: '<label>',
    description: '<Description>',
    group: '<Group>' // optional
  }
2. "extended" -> this needs to be a boolean and the UI will be rendered based on this property. 
    The component will be rendered in normal mode if the value is 'false' or the property is missing.
3. "theme" -> the theme can be 'dark' or 'light'. The component will be rendered in Dark mode if the prop and value are provided. 
    It will have the light theme in other cases.
4. "title" -> this is the title for the select component
5. "onChange" -> function that needs to be called when an item is selected from the dropdown


## Instructions

1. Clone the application to your location and open terminal in the application folder
2. Run 'npm install'
3. Start the application -> Run 'npm start'. The application will start running on "http://localhost:3000/"
4. Test the application -> Run "npm run test"
