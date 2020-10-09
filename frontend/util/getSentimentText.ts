export const getSentimentScoreText = (score: number) => {

    if (score < 0.2) {
        return 'Incredibly Negative'
    }
    else if (score < 0.35) {
        return 'Negative'
    }
    else if (score < 0.45) {
        return 'Slightly Negative'
    }
    else if (score < 0.55) {
        return 'Balanced'
    }
    else if (score < 0.65) {
        return 'Slightly Positive';
    } 
    else if (score < 0.8) {
        return 'Positive';
    } 
    else {
        return 'Incredibly Positive'
    }
}

// Returns text based on the adjusted magnitude value.
export const getSentimentMagnitudeText = (magnitude: number) => {
    if (magnitude < 0.1) {
        return 'Apathetic'
    }
    if (magnitude < 0.2) {
        return 'Limited Emotion'
    }
    else if (magnitude < 0.35) {
        return 'Slightly Emotional'
    }
    else if (magnitude < 0.45) {
        return 'Somewhat Emotional'
    }
    else if (magnitude < 0.55) {
        return 'Fairly Emotional'
    }
    else if (magnitude < 0.65) {
        return 'Emotional';
    } 
    else if (magnitude < 0.8) {
        return 'Very Emotional';
    } 
    else {
        return 'Incredibly Emotional'
    }
}
