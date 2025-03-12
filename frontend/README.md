## Getting Started

//////////////////////////////////////////FRONTEND//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
## Custom Menu Selection Component 
This is how we will be creating most menus in our app. Here's a quick breakdown on how to leverage this shiny toy in a couple simple steps:

1.Import the component into whatever place you need to use it at like shown below (without the backticks ---> `` <---)
`import CustomMenuSelection from "@/components/CustomMenuSelection";`

2.Import the useSelection custom hook I've also created into the same place as shown below (without the backticks ---> `` <---)
`import useSelection from "@/customHooks/useSelection";`

3.Import the component prop interface as shown below (without the backticks ---> `` <---):
` import CustomMenuSelection, {ButtonsInfo} from "@/components/CustomMenuSelection";`

That's all the importing needed to get started. Up next, here's how these need to be further setup and used:

## Using the useSelection Hook (without the backticks ---> `` <---)
`const {currentSelection, setCurrentSelection, isCurrentSelection} = useSelection();`

currentSelection starts with an initial value of `none`.
setCurrentSelection updates `currentSelection`.
isCurrentSelection simply needs 1 argument of type `string`. It returns either `true` or `false` based on whether the passed `string` is the same as the `currentSelection` state variable.

## Using the **ButtonsInfo** prop. 

This is used for marking objectTypes as shown below:

const testButtonsInfo: ButtonsInfo = {
    buttonNames: ["Something", "Something2", "Something3", "Something4"],
    passedClassName: styles["selectable-button-text"],
    setCurrentSelection: setCurrentSelection,
    isCurrentSelection: isCurrentSelection,
    popularName: "Extra Button",
    containerClassName: styles["your-awesome-class-name"]
};
`popularName` //Don't forget this variable is optional. When given a string, it'll enable an extra button with said string as its content. Omitting this step will keep it hidden.

## Using the Custom Component we imported earlier

Although the component is called ["CustomMenuSelection"], you can name it whatever you want when you first import it:
So this `import CustomMenuSelection from "@/components/CustomMenuSelection";`
could be written like this `import IngredientInventoryMenu from "@/components/CustomMenuSelection";`

...and be used like this:

<IngredientInventoryMenu />
but let's not forget about our beautiful object...
<IngredientInventoryMenu {...testButtonsInfo}/>// so much better ;)

WHENEVER YOU'RE DEALING WITH ANYTHING DYNAMIC, DON'T FORGET TO INCLUDE 'use client' AT THE TOP OF THE FILE PLS, OR NEXTJS 15 WILL HATE YOU AND TAKE YOUR PET/S.

...aaaand that's it! You've created the bestest custom menu out there! Sell it on Gumroad or something and make that dinero!

## BRIEF TUTORIAL ON USING CSS MODULES IN NEXTJS 15!

Whenever you create a component, you'll want to add some styling to that bad boy. This is done by going into the ["styles"] folder, and creating a new file with the following format:

`TheSameNameOfTheComponentFile.module.css`

Then when the time to use this comes, all you gotta do is this:

//In the file that's gonna be using the css module
import yourName from "../styles/`TheSameNameOfTheComponentFile.module.css`"

Now, go to whatever element that needs this, and apply it...

...but wait, how do i do that?
Well my little grass hopper, that'll depend on how you named your class in that sweet ol' css module.

If you went with the sweet and loyal `camelCase` approach, you can do it like this:

<div className={styles.mySweetClassName}></div>

If you're a rebel like me, you might've wondered if `my-sweet-class-name` was possible. The good news is that it totally is, but with a small catch:

<div className={ styles["my-sweet-class-name"] }></div>

the catch is having to use square brackets and quotation marks to get this done. That's it.

Here's how you can apply more than one class in both styles:

# Style 1
<div className={ `${styles.mySweetClassName} ${styles.mySweetClassName2}`}></div>

# Style 2
<div className={ `${styles["my-sweet-class-name"]} ${styles["my-other-sweet-class-name"]}`}></div>