import * as React from 'react';
import { Button, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { toast } from 'sonner-native';

export const ToastDemo: React.FC = () => {
  const [toastId, setToastId] = React.useState<string | number | null>(null);
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 100 }}>
      <Button
        title={toastId ? 'Update toast' : 'Show toast'}
        onPress={() => {
          if (toastId) {
            toast.success('Updated!', {
              id: toastId,
              onDismiss: () => {
                setToastId(null);
              },
              onAutoClose: () => {
                setToastId(null);
              },
            });
          } else {
            const id = toast.success('Changes saved', {
              onDismiss: () => {
                setToastId(null);
              },
              onAutoClose: () => {
                setToastId(null);
              },
            });
            setToastId(id);
          }
        }}
      />
      <Button
        title="Show toast with description"
        onPress={() => {
          toast.success('Changes saved', {
            description: 'Your changes have been saved successfully',
            closeButton: true,
          });
        }}
      />
      <Button
        title="Show toast with description and action"
        onPress={() => {
          toast.success('Changes saved', {
            action: {
              label: 'See changes',
              onClick: () => {
                console.log('Action pressed');
              },
            },
            description:
              'Your changes have been saved successfully. This might go into a newline but we handle that by wrapping the text.',
          });
        }}
      />
      <Button
        title="Invert toast"
        onPress={() => toast('Inverted toast', { invert: true })}
      />
      <Button
        title="Custom id"
        onPress={() => toast('Custom id', { id: '123' })}
      />
      <Button
        title="Custom icon"
        onPress={() => {
          toast('Custom icon', {
            icon: (
              <View>
                <Text>🚀</Text>
              </View>
            ),
          });
        }}
      />
      <Button title="Show outside of a React component" onPress={handleToast} />
      <Button
        title="Toast with a promise"
        onPress={() => {
          toast.promise(
            new Promise((resolve) => {
              setTimeout(() => {
                resolve('Promise resolved');
              }, 7000);
            }),
            {
              loading: 'Loading...',
              success: (result: string) => `Promise resolved: ${result}`,
              error: 'Promise failed',
            }
          );
        }}
      />
      <Button
        title="Windows XP with styles only"
        onPress={() => {
          const id = toast('Blue screen of death', {
            action: {
              label: 'OK',
              onClick: () => {
                toast.dismiss(id);
              },
            },
            unstyled: true,
            icon: (
              <Image
                source={require('../assets/windows-xp.png')}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            ),
            actionButtonStyle: {
              borderStyle: 'dashed',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 2,
              paddingVertical: 6,
              paddingHorizontal: 10,
              marginTop: 8,
              alignSelf: 'center',
            },
            actionButtonTextStyle: {
              fontSize: 14,
              color: 'black',
              textAlign: 'center',
            },
            styles: {
              toastContainer: {
                paddingHorizontal: 16,
                marginBottom: 16,
              },
              toast: {
                backgroundColor: '#ECE9D8',
                borderRadius: 3,
                padding: 15,
                borderColor: '#0055EA',
                borderWidth: 2,
              },
              toastContent: {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              },
              title: {
                fontSize: 14,
                fontWeight: 'light',
                fontFamily: 'sans-serif',
                color: 'black',
                marginBottom: 5,
                marginLeft: 4,
                textAlign: 'center',
              },
              description: {
                fontSize: 14,
                color: '#000000',
                marginBottom: 10,
              },
              closeButton: {
                backgroundColor: '#DD3C14',
                borderRadius: 2,
                alignSelf: 'flex-start',
              },
            },
          });
        }}
      />
      <Button
        title="iOS like toast"
        onPress={() =>
          toast('AirPods Pro', {
            description: 'Connected',
            icon: (
              <Image
                src={require('../assets/airpods.png')}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            ),
            unstyled: true,
            closeButton: false,
            dismissible: false,
            styles: {
              toastContainer: {
                alignItems: 'center',
              },
              toast: {
                shadowOpacity: 0.0015 * 4 + 0.1,
                shadowRadius: 3 * 4,
                shadowOffset: {
                  height: 4,
                  width: 0,
                },
                elevation: 4,
                backgroundColor: 'white',
                borderRadius: 999999,
                borderCurve: 'continuous',
              },
              toastContent: {
                padding: 12,
                paddingHorizontal: 32,
              },
              title: {
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 4,
              },
              description: {
                fontSize: 14,
                color: '#666',
                textAlign: 'center',
              },
            },
          })
        }
      />
      <Button
        title="Custom JSX"
        onPress={() => {
          toast.custom(
            <View
              style={{
                width: '80%',
                backgroundColor: '#26252A',
                paddingLeft: 24,
                paddingRight: 8,
                paddingVertical: 8,
                borderRadius: 999,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderCurve: 'continuous',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                }}
              >
                Custom JSX
              </Text>
              <Pressable
                style={{
                  backgroundColor: '#40424B',
                  borderWidth: 1,
                  borderColor: '#55555C',
                  borderRadius: 999,
                  padding: 8,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  Press me
                </Text>
              </Pressable>
            </View>,
            {
              duration: 30000,
            }
          );
        }}
      />
      <Button
        title="Dismiss active toast"
        disabled={!toastId}
        onPress={() => toast.dismiss(toastId!)}
      />
      <Button
        title="Dismiss all toasts"
        onPress={() => {
          toast.dismiss();
          setToastId(null);
        }}
      />
      <Button
        title="Non-dismissible"
        onPress={() =>
          toast.success('Non-dismissible toast', { dismissible: false })
        }
      />
      <Button
        title="Infinity toast"
        onPress={() => {
          const id = toast.success('Infinity toast', {
            duration: Infinity,
            dismissible: false,
            action: {
              label: 'Acknowledge',
              onClick: () => {
                toast.dismiss(id);
                setToastId(null);
              },
            },
          });

          setToastId(id);
        }}
      />
      <Button
        title="Custom icon in Toaster"
        onPress={() => {
          toast.error('Custom icon');
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          toast('My cancel toast', {
            cancel: {
              label: 'Cancel',
              onClick: () => console.log('Cancel!'),
            },
          });
        }}
      />
      <Button
        title="JSX action"
        onPress={() => {
          toast('JSX action', {
            description: 'This toast has a JSX action',
            action: (
              <Button
                title="Press me"
                onPress={() => console.log('JSX action')}
              />
            ),
          });
        }}
      />
      <Button
        title="Loading variant"
        onPress={() => toast.loading('Loading...')}
      />
      <Button
        title="Dynamic position"
        onPress={() => toast('Dynamic position', { position: 'bottom-center' })}
      />
      <Button
        title="Loading icon override"
        onPress={() => toast.loading('Loading...')}
      />
      <Button
        title="Dynamic position"
        onPress={() => toast('Dynamic position', { position: 'bottom-center' })}
      />
      <Button title="Warning toast" onPress={() => toast.warning('Warning')} />
    </ScrollView>
  );
};

const handleToast = () => {
  toast.info('I am outside!');
};
