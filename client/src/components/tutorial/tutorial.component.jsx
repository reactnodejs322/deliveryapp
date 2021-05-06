import React from "react";
import "./tutorial.styles.scss";

import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';

const TutorialButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#eee"
      }
    }
  }))(Button);

const Tutorial = () => {

    return(

        <div className="tutorial-container">

            <span className="close-tutorial">X close tutorial</span>

            <p className="tutorial-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nisi suscipit, aliquet purus nec, ultricies lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

            {/* Not sure how to orginize this dives */}

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
            
            {/* Can't change text color of buttons stupid material ui */}

            <div className="buttons">
                <TutorialButton 
                    style={{
                    borderRadius: "20px",
                    padding: "3px 30px",
                    margin: "0 25px"}}
                >
                    Prev
                </TutorialButton>

                <TutorialButton 
                    style={{
                    borderRadius: "20px",
                    padding: "3px 30px",
                    margin: "0 25px"}}
                >
                    Next
                </TutorialButton>

                
            </div>

        </div>
    )
}

export default Tutorial;