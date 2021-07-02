from flask import Flask, render_template, request
from datetime import datetime # used to parse payload
from youtube_transcript_api import YouTubeTranscriptApi as yta
from transformers import T5ForConditionalGeneration, T5Tokenizer
import re
import json



# variable to hold app
app = Flask(__name__)

# resource endpoints
@app.route('/transcript/', methods=['GET', 'POST'])
def trans():

    url = 'https://www.youtube.com/watch?v=YEEFrnBhY4I'

    video_id = url.split('v=')[-1]

        
    data = yta.get_transcript(video_id)
    transcript = ''
    for value in data:
        for key,val in value.items():
            if key == 'text':
                transcript += val

    l = transcript.splitlines()
    trans.i = (json.dumps(l, indent=1))
    return trans.i

@app.route('/summary/', methods=['GET', 'POST'])
def summ():
    
     
    trans()
    # initialize the model architecture and weights
    model = T5ForConditionalGeneration.from_pretrained("t5-base")
    # initialize the model tokenizer
    tokenizer = T5Tokenizer.from_pretrained("t5-base")

# encode the text into tensor of integers using the appropriate tokenizer
    inputs = tokenizer.encode("summarize: " + trans.i, return_tensors="pt", max_length=1024, truncation=True)

# generate the summarization output
    outputs = model.generate(
        inputs, 
        max_length=512, 
        min_length=20, 
        length_penalty=2.0, 
        num_beams=20, 
        early_stopping=True)
# just for debugging
    print(outputs)
    return(tokenizer.decode(outputs[0]))

summ()

  
   

@app.route('/time', methods=['GET'])
def get_time():
    return str(datetime.datetime.now())


# server the app when this file is run
if __name__ == '__main__':
    app.run(debug=True)
