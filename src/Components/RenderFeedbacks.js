import { useEffect, useRef, useState } from "react";
import classes from './RenderFeedbacks.module.css';

const RenderFeedbacks = (props) => {
    let count = useRef(0);      // Dynamic key value for the list

    return (
        <div className={classes.feedbacks}>
            {props.feedbacks.map(feedback => {
                count = count + 1;
                return(<h3 key={count}>{feedback.userName} says {feedback.feedback}</h3>);
            })}
        </div>
    );
}
export default RenderFeedbacks;