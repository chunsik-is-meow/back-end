import os
import tensorflow as tf
from keras.models import load_model
import test_dataset.data_info as di

result = json.loads(sys.argv[1])['result']
inputData = json.loads(sys.argv[2])['inputData']

test_model = 'iris_model.h5'
test_data = 'iris_test.csv'
batch_size = 32

label_name= di.iris_label_name
label_names = di.iris_labels
column_names = di.iris_columns

test_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(test_data),origin=test_data)

test_dataset = tf.data.experimental.make_csv_dataset(test_dataset_fp,batch_size,column_names=column_names,label_name=label_name,num_epochs=1,shuffle=False)
def pack_features_vector(features, labels):
  features = tf.stack(list(features.values()), axis=1)
  return features, labels
test_dataset = test_dataset.map(pack_features_vector)
test_accuracy = tf.keras.metrics.Accuracy()

# model Acurracy
uploaded_model = load_model('iris_model.h5')

for (x, y) in test_dataset:
  logits = uploaded_model(x)
  prediction = tf.argmax(logits, axis=1, output_type=tf.int32)
  test_accuracy(prediction, y)

score = float(format(test_accuracy.result())) * 100
print(score)
