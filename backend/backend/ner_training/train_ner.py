import spacy
from spacy.training import Example
from spacy.util import minibatch
import random
import os
from train_data import TRAIN_DATA  # Import from separate file

def train_ner_model():
    # 1. Create blank model
    nlp = spacy.blank("xx")  # Multi-language
    
    # 2. Add NER pipeline
    if "ner" not in nlp.pipe_names:
        ner = nlp.add_pipe("ner")
    
    # 3. Add labels
    for label in set([ent[2] for item in TRAIN_DATA for ent in item[1]["entities"]]):
        ner.add_label(label)

    # 4. Initialize model
    nlp.initialize(lambda: [Example.from_dict(nlp.make_doc(text), annot) 
                   for text, annot in TRAIN_DATA])

    # 5. Training loop
    for itn in range(30):
        random.shuffle(TRAIN_DATA)
        losses = {}
        batches = minibatch(TRAIN_DATA, size=8)
        for batch in batches:
            for text, annotations in batch:
                doc = nlp.make_doc(text)
                example = Example.from_dict(doc, annotations)
                nlp.update([example], losses=losses, drop=0.5)  # Added dropout
        print(f"Iteration {itn+1} - Loss: {losses}")

    # 6. Save model
    output_dir = os.path.join("backend", "custom_service_ner")
    os.makedirs(output_dir, exist_ok=True)
    nlp.to_disk(output_dir)
    print(f"Model saved to {output_dir}")

if __name__ == "__main__":
    train_ner_model()