from flask import Flask , jsonify, request
from flask_cors import CORS
import tempfile
from scipy.io import wavfile



app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    # Handle file upload
    file = request.files['file']
    # check if the file is a .wav file
    if not file.filename.endswith('.wav'):
        return {'code':3,'result': 'File extension not allowed, only .wav files are allowed'}
    
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
        file.save(temp_file.name)
        file_path = temp_file.name
    
    file.save(file.filename)

    # Retrieve form data
    fever_or_chills = request.form.get('fever_or_chills')
    shortness_of_breath = request.form.get('shortness_of_breath')
    fatigue = request.form.get('fatigue')
    muscle_or_body_aches = request.form.get('muscle_or_body_aches')
    headache = request.form.get('headache')
    loss_of_taste_or_smell = request.form.get('loss_of_taste_or_smell')
    congestion_or_runny_nose = request.form.get('congestion_or_runny_nose')
    sore_throat = request.form.get('sore_throat')
    nausea_or_vomiting = request.form.get('nausea_or_vomiting')

    # print the form data to console
    print('fever_or_chills:', fever_or_chills)
    print('shortness_of_breath:', shortness_of_breath)
    print('fatigue:', fatigue)
    print('muscle_or_body_aches:', muscle_or_body_aches)
    print('headache:', headache)
    print('loss_of_taste_or_smell:', loss_of_taste_or_smell)
    print('congestion_or_runny_nose:', congestion_or_runny_nose)
    print('sore_throat:', sore_throat)
    print('nausea_or_vomiting:', nausea_or_vomiting)

    booleans = [fever_or_chills, shortness_of_breath, fatigue, muscle_or_body_aches, headache, loss_of_taste_or_smell, congestion_or_runny_nose, sore_throat, nausea_or_vomiting]
    true_count = booleans.count(True)
    false_count = booleans.count(False)
    if true_count > false_count:
        form = True
    else:
        form = False

    #file preprocessing
    # Read input file
    rate, data = wavfile.read(file_path)
    

    return {'code':1,'result': 'According to your sysmptoms and your cough sound, you are infected with COVID-19. Please consult a doctor immediately.'}

if __name__ == '__main__':
    app.run(debug=True)

