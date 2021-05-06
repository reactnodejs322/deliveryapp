import React from "react";
import "./tutorial.styles.scss";
import Button from '@material-ui/core/Button';



const Tutorial = () => {

    return(

        <div className="tutorial-container">

            <span className="close-tutorial">X close tutorial</span>

            <p className="tutorial-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nisi suscipit, aliquet purus nec, ultricies lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

            {/* Not sure how to orginize this dives for now*/}

            <div className="tutorial-selectors">
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector active"></div>
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector"></div>
                <div className="selector"></div>
            </div>


            <div className="buttons">
               
                <Button 
                    style={{
                    backgroundColor: "#fff",     
                    borderRadius: "20px",
                    padding: "3px 30px",
                    margin: "0 25px"}}
                >
                    Prev
                </Button>

                <Button 
                    style={{
                    backgroundColor: "#fff", 
                    borderRadius: "20px",
                    padding: "3px 30px",
                    margin: "0 25px"}}
                >
                    Next
                </Button>

                
            </div>

        </div>
    )
}

export default Tutorial;