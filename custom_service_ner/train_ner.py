
import spacy
from spacy.training import Example
from spacy.util import minibatch
from spacy.tokens import DocBin
import random
import warnings
import os

# 1. Create Blank English Model
nlp = spacy.blank("xx")

# 2. Create NER Pipeline
if "ner" not in nlp.pipe_names:
    ner = nlp.add_pipe("ner", last=True)
else:
    ner = nlp.get_pipe("ner")

# 3. Add Labels
ner.add_label("SERVICE")

# 4. Training Data
TRAIN_DATA = [
    # 🛠 Your full TRAIN_DATA here (same as you pasted)
    ("I want to repair my AC", {"entities": [(20, 22, "SERVICE")]}),
    ("Please fix my fridge", {"entities": [(14, 20, "SERVICE")]}),
    ("मुझे वॉशिंग मशीन ठीक करवानी है", {"entities": [(5, 11, "SERVICE")]}),
    ("पानी की टंकी की सफाई चाहिए", {"entities": [(0, 4, "SERVICE")]}),
    ("Mein möchte mein Sofa reparieren", {"entities": [(17, 21, "SERVICE")]}),
    ("Need a good plumber urgently", {"entities": [(12, 19, "SERVICE")]}),
    ("Urgent bike service required", {"entities": [(7, 11, "SERVICE")]}),
    ("Book a carpenter to fix door", {"entities": [(7, 16, "SERVICE")]}),
    ("Geyser repair needed", {"entities": [(0, 6, "SERVICE")]}),
    ("मुझे पंखा रिपेयर करवाना है", {"entities": [(5, 9, "SERVICE")]}),
    ("Je veux nettoyer mon sofa", {"entities": [(21, 25, "SERVICE")]}),
    ("Necesito limpiar mi refrigerador", {"entities": [(20, 32, "SERVICE")]}),
    ("我想清洗我的沙发", {"entities": [(0, 8, "SERVICE")]}),
    ("مجھے کار کی سروس چاہیے", {"entities": [(12, 16, "SERVICE")]}),
    ("Need pest control service urgently", {"entities": [(5, 9, "SERVICE")]}),
    ("Book kitchen cleaning service", {"entities": [(5, 12, "SERVICE")]}),
    ("Bathroom cleaning service is required", {"entities": [(0, 8, "SERVICE")]}),
    ("Hire a yoga trainer at home", {"entities": [(7, 11, "SERVICE")]}),
    ("I am looking for a personal chef", {"entities": [(28, 32, "SERVICE")]}),
    ("Require an interior designer", {"entities": [(20, 28, "SERVICE")]}),
    ("مجھے اپنے ٹی وی کی مرمت کرنی ہے۔", {"entities": [(10, 12, "SERVICE")]}),
    ("我想修理冰箱", {"entities": [(0, 6, "SERVICE")]}),
    ("Je veux réparer mon climatiseur", {"entities": [(20, 31, "SERVICE")]}),
    ("I need electrician for wiring", {"entities": [(7, 18, "SERVICE")]}),
    ("Looking for bike service", {"entities": [(12, 16, "SERVICE")]}),
    ("Get my water purifier checked", {"entities": [(7, 12, "SERVICE")]}),
    ("Need sofa cleaning services", {"entities": [(5, 9, "SERVICE")]}),
    ("Mujhe apne AC ki service karwani hai", {"entities": [(11, 13, "SERVICE")]}),
    ("AC repair karwana hai urgently", {"entities": [(0, 2, "SERVICE")]}),
    ("Cooler ki servicing chahiye", {"entities": [(0, 6, "SERVICE")]}),
    ("गैस चूल्हा ठीक करवाना है", {"entities": [(4, 10, "SERVICE")]}),
    ("Water purifier ko repair karna hai", {"entities": [(0, 5, "SERVICE")]}),
    ("मैं अपने लैपटॉप को ठीक कराना चाहता हूं", {"entities": [(9, 15, "SERVICE")]}),
    ("Mobile screen replacement chahiye", {"entities": [(0, 6, "SERVICE")]}),
    ("Phone ka display thik karwana hai", {"entities": [(0, 5, "SERVICE")]}),
    ("Fridge cooling problem solve karna hai", {"entities": [(0, 6, "SERVICE")]}),
    ("Refrigerator service required", {"entities": [(0, 12, "SERVICE")]}),
    ("Microwave oven repair service chahiye", {"entities": [(0, 9, "SERVICE")]}),
    ("वॉशिंग मशीन रिपेयर करवानी है", {"entities": [(0, 6, "SERVICE")]}),
    ("Washing machine ka problem hai", {"entities": [(0, 7, "SERVICE")]}),
    ("Pani ki motor repair chahiye", {"entities": [(0, 4, "SERVICE")]}),
    ("Sofa cleaning karwana hai", {"entities": [(0, 4, "SERVICE")]}),
    ("Geyser installation service chahiye", {"entities": [(0, 6, "SERVICE")]}),
    ("Heater repair service", {"entities": [(0, 6, "SERVICE")]}),
    ("Pipe fitting kaam karwana hai", {"entities": [(0,4 , "SERVICE")]}),
    ("Toilet blockage solve karwana hai", {"entities": [(0, 6, "SERVICE")]}),
    ("Bathroom renovation karwana hai", {"entities": [(0, 8, "SERVICE")]}),
    ("Painter chahiye ghar ke liye", {"entities": [(0, 7, "SERVICE")]}),
    ("घर की पेंटिंग करवानी है", {"entities": [(6, 13, "SERVICE")]}),
    ("Electrician chahiye urgent", {"entities": [(0, 11, "SERVICE")]}),
    ("Fan repairing ka kaam hai", {"entities": [(0, 3, "SERVICE")]}),
    ("Switch board fixing service", {"entities": [(0, 6, "SERVICE")]}),
    ("Ceiling fan installation", {"entities": [(8, 11, "SERVICE")]}),
    ("LED TV repair chahiye", {"entities": [(4, 6, "SERVICE")]}),
    ("Television wall mounting chahiye", {"entities": [(0, 10, "SERVICE")]}),
    ("पुराना टीवी रिपेयर कराना है", {"entities": [(7, 11, "SERVICE")]}),
    ("Mujhe apna AC repair karwana hai", {"entities": [(11, 13, "SERVICE")]}),
    ("Geyser service chahiye", {"entities": [(0, 6, "SERVICE")]}),
    ("Water purifier ka repair chahiye", {"entities": [(0, 5, "SERVICE")]}),
    ("Fan ka problem solve karwana hai", {"entities": [(0, 3, "SERVICE")]}),
    ("RO repair karwana hai urgently", {"entities": [(0, 2, "SERVICE")]}),
    ("Mujhe laptop repair chahiye", {"entities": [(6, 12 , "SERVICE")]}),
    ("Fridge ki service karani hai", {"entities": [(0, 6, "SERVICE")]}),
    ("Sofa cleaning karwana hai urgently", {"entities": [(0, 4, "SERVICE")]}),
    ("Plumbing kaam karwana hai", {"entities": [(0, 8, "SERVICE")]}),
    ("Painting service chahiye", {"entities": [(0, 8, "SERVICE")]}),
    ("Mobile repair karwana hai", {"entities": [(0, 6, "SERVICE")]}),
    ("Mujhe pankha thik karwana hai", {"entities": [(6, 12, "SERVICE")]}),
    ("AC repair karwana hai", {"entities": [(0, 2, "SERVICE")]}),
    ("Pipe leakage fix karni hai", {"entities": [(0, 4, "SERVICE")]}),
    ("I need a plumber to fix my sink", {"entities": [(9, 16, "SERVICE")]}),
    ("Can you send an electrician?", {"entities": [(16, 27, "SERVICE")]}),
    ("Looking for food delivery", {"entities": [(12, 16, "SERVICE")]}),
    ("I need a mechanic for my car", {"entities": [(25, 28, "SERVICE")]}),
    ("Find me a tutor for my kid", {"entities": [(23, 26, "SERVICE")]}),
    ("Can you send an electrician for wiring work?", {"entities": [(16, 27, "SERVICE")]}),
    ("I am looking for a food delivery", {"entities": [(19, 23, "SERVICE")]}),
    ("My kid needs a tutor", {"entities": [(3, 6, "SERVICE")]}),
]

# 5. Utility to Verify Alignment (optional)
def verify_alignment(text, entities):
    """Ensure entity spans are valid in the text"""
    doc = nlp.make_doc(text)
    for start, end, label in entities:
        assert text[start:end].strip() != "", f"Empty entity span in text: {text}"
        assert start >= 0 and end <= len(text), f"Entity span {start}-{end} out of bounds in text: {text}"
        # Optional warning for non-token-aligned spans
        entity_text = text[start:end]
        if entity_text not in [token.text for token in doc]:
            warnings.warn(f"Potential misalignment: '{entity_text}' not matching tokens in: {text}")

# 6. Verify all examples (optional, for debugging)
for text, annotations in TRAIN_DATA:
    verify_alignment(text, annotations["entities"])

# 7. Initialize Model
nlp.initialize(lambda: [Example.from_dict(nlp.make_doc(text), annotations) for text, annotations in TRAIN_DATA])

# 8. Training Loop
n_iter = 30
for itn in range(n_iter):
    random.shuffle(TRAIN_DATA)
    losses = {}
    batches = minibatch(TRAIN_DATA, size=8)
    for batch in batches:
        for text, annotations in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], losses=losses)
    print(f"Iteration {itn+1}/{n_iter} - Loss: {losses}")

# 9. Save trained data into a .spacy file
output_dir = "backend/custom_service_ner"
os.makedirs(output_dir, exist_ok=True)

doc_bin = DocBin()
for text, annotations in TRAIN_DATA:
    doc = nlp.make_doc(text)
    ents = []
    for start, end, label in annotations.get("entities"):
        span = doc.char_span(start, end, label=label)
        if span is None:
            warnings.warn(f"Skipping span '{text[start:end]}' due to misalignment.")
        else:
            ents.append(span)
    doc.ents = ents
    doc_bin.add(doc)

# Save DocBin
doc_bin.to_disk(os.path.join(output_dir, "train.spacy"))
print(f"\n✅ Saved {len(doc_bin)} training documents to {os.path.join(output_dir, 'train.spacy')}")

# 10. Quick Check
doc_bin_loaded = DocBin().from_disk(os.path.join(output_dir, "train.spacy"))
docs = list(doc_bin_loaded.get_docs(spacy.blank("en").vocab))

print(f"\nTotal number of documents: {len(docs)}")
for i, doc in enumerate(docs[:5]):  # Show only first 5 docs
    print(f"\nDoc {i+1}: {doc.text}")
    print(f"Entities: {[(ent.text, ent.label_) for ent in doc.ents]}")
