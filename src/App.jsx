// import { openaiKey } from '../firebase'
// import { useState, useEffect } from 'react'
// import './App.css'
// import { db } from '../firebase'
// import { collection, addDoc } from "firebase/firestore";
// import { Configuration, OpenAIApi } from "openai";
// import { FloppyDisk, FloppyDiskBack, HandsClapping, Carrot } from "@phosphor-icons/react";

// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// const sample = {"dish": "fries", 
// "ingredients": [
// "4-5 large russet potatoes", 
// "1/4 cup vegetable oil", 
// "1 teaspoon salt"
// ], 
// "instructions": [
// "Preheat oven to 450 degrees F (230 degrees C).",
// "Wash and peel potatoes, and cut into desired shape and size.",
// "In a large bowl, toss potatoes with vegetable oil and salt until evenly coated.",
// "Spread potatoes in a single layer on a baking sheet.",
// "Bake for 20-25 minutes, flipping once halfway through, or until golden brown and crispy.",
// "Remove from oven, let cool for a few minutes, and serve hot."
// ]
// }

// function App() {
//   const [recipe, setRecipe] = useState(sample)
//   const [popup, setPopup] = useState(false)
//   const [selectedIngredient, setSelectedIngredient] = useState("")
//   const [userInput, setUserInput] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [loadingIndex, setLoadingIndex] = useState(0);
//   const [enhanced, setEnhanced] = useState(false)
//   const [healthy, setHealthy] = useState(false)
//   const [recipeSaved, setRecipeSaved] = useState(false)
//   const [selectActive, setSelectActive] = useState(false)

//   const loadingStatements = [
//   "Searching for the recipe online...",
//   "Sifting through all the SEO content...",
//   "This could be a good option...",
//   "Dodging all the popup ads...",
//   "Skimming through the stories...",
//   "Closing a video...",
//   "Skipping over a banner ad...",
//   // Add as many statements as you like
// ];

//   // a useEffect hook that updates the loadingIndex state variable every two seconds, causing the loading statements to change:
//   useEffect(() => {
//   const intervalId = setInterval(() => {
//     setLoadingIndex((prevIndex) => (prevIndex + 1) % loadingStatements.length);
//   }, 4000);
//   return () => clearInterval(intervalId);
// }, []);

//   // openAI configuration object
//   const configuration = new Configuration({
//       apiKey: apiKey,
//     });         
//   const openai = new OpenAIApi(configuration);


//   let dishName = ""
//   let ingredients = []
//   let instructions = []


//   if (recipe && recipe['dish'] && recipe['ingredients']) {
//     dishName = recipe['dish']
//     ingredients = recipe['ingredients'].map(each => {
//       return (
//         <div className='flex flex-row items-baseline'>
//           {selectActive && <input type="checkbox" className='mr-2' />}
//           <li
//           className='text-sm cursor-pointer list-none mb-2 hover:opacity-60'
//           key={each}
//           onClick={() => { selectIngredient(each) }}>{each}</li>
//         </div>
        
//       )
//     })
//     instructions = recipe['instructions'].map((each, index) => {
//       return (
//         <li className='text-sm list-none mb-1' key={each}><span className='font-bold'>{index + 1}. </span>{each}</li>
//       )
//     })
//   }
  
//   function checkForSubmit(event) {
//     if (userInput.trim().length < 3) return;
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       getRecipe()
//     }
//   }
  
//   function togglePopup() {
//     setPopup(!popup)
//   }

//   function selectIngredient(each) {
//     setSelectedIngredient(each)
//     togglePopup()
//   }

//   function getRecipe() {
//     setLoading(true);

//     // Submit prompt to openAI API
//     const prompt = `return a recipe for ${userInput} formatted as: {"dish": ${userInput}, "ingredients": [array of strings],
//     "instructions": [array of strings]}`;

//     openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     })
//       .then((completion) => {
//         // Handle API response
//         const generatedText =
//           completion.data.choices[0].message.content;

//         console.log(completion);  
//         console.log(generatedText);
//         setLoading(false)
//         setRecipe(JSON.parse(generatedText));
//         setRecipeSaved(false)
//         setUserInput("")
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false)
//         setRecipe("");
//       });
//   }

//   function getRecipeWithSubstitute() {
//     setLoading(true);
//     setPopup(false)
//     // Submit prompt to openAI API
//     const prompt = `Generate another version of this recipe but substitute the ${selectedIngredient} with something else: ${JSON.stringify(recipe)} Format response as: {"dish": ${dishName}, "ingredients": [array of strings],
//     "instructions": [array of strings]}`;

//     openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     })
//       .then((completion) => {
//         // Handle API response
//         const generatedText =
//           completion.data.choices[0].message.content;

//         console.log(completion);  
//         console.log(generatedText);
//         setLoading(false)
//         setRecipe(JSON.parse(generatedText));
//         setRecipeSaved(false)
//         setUserInput("")
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false)
//         setRecipe("");
//       });
//   }

//   function enhanceRecipe() {
//     setLoading(true);

//     // Submit prompt to openAI API
//     const prompt = `Enhance this recipe to make it more interesting and flavorful: ${JSON.stringify(recipe)} Format response as: {"dish": ${dishName}, "ingredients": [array of strings],
//     "instructions": [array of strings]}`;

//     openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     })
//       .then((completion) => {
//         // Handle API response
//         const generatedText =
//           completion.data.choices[0].message.content;

//         console.log(completion);  
//         console.log(generatedText);
//         setLoading(false)
//         setRecipe(JSON.parse(generatedText));
//         setRecipeSaved(false)
//         setUserInput("")
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false)
//         setRecipe("");
//       });
//   }

//   function getHealthyRecipe() {
//     setLoading(true);

//     // Submit prompt to openAI API
//     const prompt = `Rewrite this recipe to be healthier: ${JSON.stringify(recipe)} Format response as: {"dish": ${dishName}, "ingredients": [array of strings],
//     "instructions": [array of strings]}`;

//     openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     })
//       .then((completion) => {
//         // Handle API response
//         const generatedText =
//           completion.data.choices[0].message.content;

//         console.log(completion);  
//         console.log(generatedText);
//         setLoading(false)
//         setRecipe(JSON.parse(generatedText));
//         setRecipeSaved(false)
//         setUserInput("")
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false)
//         setRecipe("");
//       });
//   }

//   async function saveRecipe(e) {
//   // Store recipe to firebase
//     try {
//       const docRef = await addDoc(collection(db, "recipes"), {
//         recipe: recipe,
//         date: new Date()
//       });
//       console.log("Document written with ID: ", docRef.id);
//       setRecipeSaved(true)
//     }
//       catch (e) {
//             console.error("Error adding document: ", e);
//           }
//   }
  
//   function handleTrelloClick() {
//     setSelectActive(!selectActive)
//   }

//   return (
//     <div className='flex flex-col items-center '>
//       <div className='flex flex-row mx-auto w-fit'>
//         <input
//         type="text"
//         className='input input-bordered w-36 sm:w-48'
//         value={userInput}
//         onKeyDown={checkForSubmit}
//         onChange={(e) => setUserInput(e.target.value.toLowerCase())}/>
//       <button className='btn btn-primary ml-4'
//         onClick={getRecipe}>get recipe</button> </div>
      
//       {loading && 
//         <div role="status" className='flex flex-col items-center'>
//         <svg aria-hidden="true" className="w-8 h-8 mt-4 text-gray-200 animate-spin  fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//         </svg>
//         <span className="sr-only">Loading...</span>
//         <p className="text-black mt-3 text-sm animate opacity-0 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
//         {loadingStatements[loadingIndex]}
//         </p>
//         </div>
//       }
//       {!loading && 
//       <div className='w-8 h-20'></div>}
//       {instructions.length > 1 &&
//         <div className='max-w-lg'>
//         <div className='text-3xl font-bold mt-3 mb-3'>{dishName}</div>
    
//         <div className='flex flex-row sm:w-auto justify-around my-8 mx-auto'>
//             {enhanced ?
//               <button className='btn w-24 h-16 sm:w-auto btn-ghost no-animation text-neutral-600 text-xs sm:text-sm'><span className='sm:mr-3'><HandsClapping size={26} weight='duotone' fill='green' /></span>enhanced</button>
//               : <button className='btn w-24 h-16 sm:w-auto btn-ghost text-neutral-600 text-xs sm:text-sm' onClick={enhanceRecipe}><span className='sm:mr-3'><HandsClapping size={26} weight='light' /></span>enhance</button>}
//             {healthy ?
//               <button className='btn w-24 h-16 sm:w-auto btn-ghost no-animation text-neutral-600 text-xs sm:text-sm'><span className='sm:mr-3'><Carrot size={26} weight='duotone' fill='orange' /></span>healthy</button>
//               : <button className='btn w-24 h-16 sm:w-auto btn-ghost text-neutral-600 text-xs sm:text-sm' onClick={getHealthyRecipe}><span className='sm:mr-3'><Carrot size={26} weight='light' /></span>make healthy</button>}
//             {recipeSaved ?
//               <button className='btn w-24 h-16 sm:w-auto btn-ghost no-animation text-neutral-600 text-xs sm:text-sm'><span className='sm:mr-3'><FloppyDiskBack size={26} weight='duotone' fill='grey'/></span>recipe saved</button>
//               : <button className='btn w-24 h-16 sm:w-auto btn-ghost text-neutral-600 text-xs sm:text-sm' onClick={saveRecipe}><span className='sm:mr-3'><FloppyDisk size={26} weight='light' /></span>save recipe</button>}
//           </div>
        
//         <div className='text-lg font-bold tracking-wide text-left my-3'>ingredients</div>
//         <div className='flex flex-col items-start text-left'>{ingredients}</div>
//         <div className='w-full flex items-start mb-8'>
//             <button
//               className='btn btn-ghost text-xs'
//               onClick={handleTrelloClick}>add items to trello<span className='ml-2'>&#8594;</span></button>  
//         </div>
//         <div className='text-lg font-bold tracking-wide text-left my-3'>instructions</div>
//         <div className='flex flex-col items-start text-left'>{instructions}</div>
        
        
//       </div>}
//       {popup && 
//         <div className='bg-white shadow-md rounded-lg w-72 sm:w-80 h-72 absolute top-52 flex flex-col items-center'>
//           <div className='text-lg font-bold my-12 sm:my-16'>{selectedIngredient}</div>
        
//           <button className='btn btn-primary w-48 mb-4' onClick={getRecipeWithSubstitute}>substitute</button>
//           <button className='btn btn-ghost w-48' onClick={togglePopup}>cancel</button>
          
//           </div>}
//     </div>
//   )
// }

// export default App



