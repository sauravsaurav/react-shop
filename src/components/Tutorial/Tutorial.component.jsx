import "./Tutorial.styles.scss";
import { motion } from "framer-motion";

const Tutorial = (props)=>{
    let name =  "user";
    if(localStorage.getItem('directoryOption')){
        let storage = JSON.parse(localStorage.getItem('directoryOption'));
        name = storage.displayName ? storage.displayName : name;
    }
    const sliderOptions = [
        {id : 1 , image : '1.png', points: [`Welcome ${name}, let's have a quick overview. Scroll down for more info.`]},
        {id : 2, image : '2.gif', points : [
                'You can create new folder by right clicking on the folder.',
                'You can delete, create another folder , create files. ',
                'You cannot delete the root folder.',
                'You can expand/shrink by clicking on the same folder.',
                'Duplicate folder / file under same level is not allowed( See left ).'
            ]
        },
        {id : 3, image : '3.gif', points : [
                'You can start coding , once you select the file (Click on the file).',
                'The code editor will automatically detect some of the closing pairs such " , {} ,[].',
                'To get extra space , press tab.',
                'To comment a line of code , press ctrl + /.',
                'To save the code , press ctrl + s or click the save button.',
                'To run the code , press ctrl + r or click the run button.',
                'NOTE : IF YOU DID NOT SAVED THE CODE AND REFRESH THE CODE WILL BE GONE. Make sure to save it, before exit.'
            ]
        },
        {id : 4, image : '4.gif', points : [
                'There are 5+ languages available . Select your favourite language.',
                'You can save your code by clicking on the save button',
                'You can customize the styles such as font family , color , style , etc',
                'You can run your code , once you have selected the language',
                'You can give additional inputs on the right top section',
                'The output will be shown under the right bottom section',
            ]
        },
        {id : 4, image : '4.gif', points : [
                    'You can start coding , once you select the file (Click on the file).',
                    'The code editor will automatically detect some of the closing pairs such " , {} ,[].',
                    'To get extra space , press tab.',
                    'To comment a line of code , press ctrl + /.',
                    'To save the code , press ctrl + s or click the save button.',
                    'To run the code , press ctrl + r or click the run button.',
                    'NOTE : IF YOU DID NOT SAVED THE CODE AND REFRESH THE CODE WILL BE GONE. Make sure to save it, before exit.'
                ]
        },
        {
            id : 5, image : '5.png', points : [
                'Hi there! Saurav here. This code editor is free to use as this moment. I am using free open source api, which is free right now. As soon as it becomes premium i will switch to my own version of api, which will be bit fast.As of now , it is free to use. So feel free to use and share with your friends. Happy Coding!'
            ], headline : true , headlineText:'Few words from developer'
        },
    ];




    return (
        <div className="tutorial-container" autoFocus={true}>
            <div className="overlay"></div>
            <motion.div className="modal"  initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <button className="close-buttton" onClick={()=>props.close()}>❌</button>
                {
                    sliderOptions.map(eachOption => {
                       return (<div className={`slider${eachOption.id} slider `}>
                            <div className="left">
                                <img height="100" width="100" src={`${process.env.PUBLIC_URL}/${eachOption.image}`} alt='Slideshow'/>
                            </div>
                            <div className="right">
                                {
                                    eachOption.headline && 
                                    <h3>{eachOption.headlineText}</h3>
                                }

                                <ul>
                                    {
                                        eachOption.points.map(p => <li>{p}</li>)
                                    }
                                </ul>
                            </div>
                        </div>);
                    })
                }
                <center><button className="dont-show-btn" onClick={()=>props.dontShowAgain()}>Close & Dont Show Again</button></center>
            </motion.div>
        </div>
    )

}

export default Tutorial;