import os
import tensorflow as tf
# train_dataset_url = "https://storage.googleapis.com/download.tensorflow.org/data/iris_training.csv"
# train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_dataset_url),origin=train_dataset_url)
# test_url = "https://storage.googleapis.com/download.tensorflow.org/data/iris_test.csv"
# test_fp = tf.keras.utils.get_file(fname=os.path.basename(test_url),origin=test_url)

# model name
model_name= 'iris_model.h5'
# data file derectory
train_file = 'iris_training.csv'
test_file = 'iris_test.csv'
# order of feature in CSV file 
column_names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']
# label name
label_names = ['Iris setosa', 'Iris versicolor', 'Iris virginica']

#################################################### Make model ####################################################
train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_file),origin=train_file)
test_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(test_file),origin=test_file)

def pack_features_vector(features, labels):
  features = tf.stack(list(features.values()), axis=1)
  return features, labels

def loss(model, x, y):
  y_ = model(x)
  return loss_object(y_true=y, y_pred=y_)

def grad(model, inputs, targets):
  with tf.GradientTape() as tape:
    loss_value = loss(model, inputs, targets)
  return loss_value, tape.gradient(loss_value, model.trainable_variables)

loss_object = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)


feature_names = column_names[:-1]
label_name = column_names[-1]

print("feature: {}".format(feature_names))
print("label: {}".format(label_name))

batch_size = 32

train_dataset = tf.data.experimental.make_csv_dataset(train_dataset_fp,batch_size,column_names=column_names,label_name=label_name,num_epochs=1)
test_dataset = tf.data.experimental.make_csv_dataset(test_dataset_fp,batch_size,column_names=column_names,label_name='species',num_epochs=1,shuffle=False)
features, labels = next(iter(train_dataset))

print(features)

train_dataset = train_dataset.map(pack_features_vector)
test_dataset = test_dataset.map(pack_features_vector)
features, labels = next(iter(train_dataset))

print(features[:5])

model = tf.keras.Sequential([
  tf.keras.layers.Dense(10, activation=tf.nn.relu, input_shape=(4,)),
  tf.keras.layers.Dense(10, activation=tf.nn.relu),
  tf.keras.layers.Dense(3)
])
model.compile(loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),optimizer='adam',metrics=['accuracy'])

optimizer = tf.keras.optimizers.Adam(learning_rate=0.01)

loss_value, grads = grad(model, features, labels)
print("단계: {}, 초기 손실: {}".format(optimizer.iterations.numpy(),loss_value.numpy()))
optimizer.apply_gradients(zip(grads, model.trainable_variables))
print("단계: {},      손실: {}".format(optimizer.iterations.numpy(),loss(model, features, labels).numpy()))

train_loss_results = []
train_accuracy_results = []

num_epochs = 201

# Learning
for epoch in range(num_epochs):
  epoch_loss_avg = tf.keras.metrics.Mean()
  epoch_accuracy = tf.keras.metrics.SparseCategoricalAccuracy()
  for x, y in train_dataset:
    loss_value, grads = grad(model, x, y)
    optimizer.apply_gradients(zip(grads, model.trainable_variables))
    epoch_loss_avg(loss_value)
    epoch_accuracy(y, model(x))
  train_loss_results.append(epoch_loss_avg.result())
  train_accuracy_results.append(epoch_accuracy.result())
  if epoch % 50 == 0:
    print("Epoch {:03d}: Loss: {:.3f}, Accuracy: {:.3%}".format(epoch,epoch_loss_avg.result(),epoch_accuracy.result()))

test_accuracy = tf.keras.metrics.Accuracy()

for (x, y) in test_dataset:
  logits = model(x)
  prediction = tf.argmax(logits, axis=1, output_type=tf.int32)
  test_accuracy(prediction, y)

print("Acurracy in test dataset: {:.3%}".format(test_accuracy.result()))
tf.stack([y,prediction],axis=1)

model.save(model_name)