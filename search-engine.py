import PyPDF2
import os, glob, re, string, nltk
import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from sklearn.feature_extraction.text import TfidfVectorizer

nltk.download('punkt')
docPHI = []
doc_source_path = 'berkas'
search_indexes = 10
vectorizer = TfidfVectorizer()


def start():
    print('initializing (wait a moment)')
    print('read pdf files')
    for filename in glob.glob(os.path.join(doc_source_path, '*.pdf')):
        with open(os.path.join(os.getcwd(), filename), 'rb') as f:
            pdf_file_obj = f
            pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
            num_page = len(pdf_reader.pages)
            for x in range(num_page):
                page_obj = pdf_reader.pages[x]
                docPHI.append(page_obj.extract_text())
    pdf_file_obj.close()

    print('preprocessing')
    doc_phi_clean = []
    for d in docPHI:
        document_test = re.sub(r'[^\x00-\x7F]+', ' ', d)
        document_test = re.sub(r'@\w+', '', document_test)
        document_test = document_test.lower()
        document_test = re.sub(r'[%s]' % re.escape(string.punctuation), ' ', document_test)
        document_test = re.sub(r'[0-9]', '', document_test)
        document_test = re.sub(r'\s{2,}', ' ', document_test)
        doc_phi_clean.append(document_test)

    doc_phi_tokenize = [word_tokenize(entry) for entry in doc_phi_clean]
    fact = StemmerFactory()
    stemmer = fact.create_stemmer()

    print('vectorize data')
    doc_phi_final = []
    for w in doc_phi_tokenize:
        doc_phi_stemming = stemmer.stem(str(w))
        doc_phi_final.append(doc_phi_stemming)

    x = vectorizer.fit_transform(doc_phi_final)
    x = x.T.toarray()
    print('initialized')
    df = pd.DataFrame(x, index=vectorizer.get_feature_names_out())
    return [df, doc_phi_final]


def query(query_param, frame):
    data_frame = frame[0]
    doc_phi_final = frame[1]
    query_param = [query_param]
    query_vct = vectorizer.transform(query_param).toarray().reshape(data_frame.shape[0], )
    sim = {}
    for i in range(search_indexes):
        sim[i] = np.dot(data_frame.loc[:, i].values, query_vct) / np.linalg.norm(data_frame.loc[:, i]) * np.linalg.norm(
            query_vct)

        sim_sorted = sorted(sim.items(), key=lambda x: x[1], reverse=True)
        for k, v in sim_sorted:
            if v != 0.0:
                print(doc_phi_final[k])
                print('---')


_frame = start()

while (True):
    query_str = input('query pencarian : ')
    query(query_str, frame=_frame)
