import { zodResolver } from '@hookform/resolvers/zod';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from './CustomTextInput';
import {
  GENDER_OPTIONS,
  SignUpFormSchema,
  signUpFormSchema,
} from './signup-form-schema';
import { getReadableValidationErrorMessage } from './utils';

export const SignupForm: React.FC = () => {
  const [shouldValidateWithZod, setShouldValidateWithZod] =
    React.useState<boolean>(false);
  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      birthDate: new Date(),
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpFormSchema> = (data) => {
    console.log(JSON.stringify(data));
  };

  const onError: SubmitErrorHandler<SignUpFormSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
    Alert.alert('Warning', getReadableValidationErrorMessage(errors));
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <Text style={styles.title}>Sign Up Form</Text>
      <View style={styles.root}>
        <FormProvider {...methods}>
          <Controller
            control={methods.control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  label="Name"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              );
            }}
          />
          <View style={styles.spacing} />
          <Controller
            control={methods.control}
            name="surname"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  label="Surname"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              );
            }}
          />
          <View style={styles.spacing} />

          <Controller
            control={methods.control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  label="Email"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <View style={styles.spacing} />

          <Controller
            control={methods.control}
            name="phoneNumber"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  label="Phone number"
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                  value={value}
                  onChangeText={(val) => onChange(val.toString())}
                  errorMessage={error?.message}
                />
              );
            }}
          />

          <View style={styles.spacing} />

          <Controller
            control={methods.control}
            name="birthDate"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <View style={styles.dateWrapper}>
                  <Text style={styles.label}>Birth date</Text>
                  <RNDateTimePicker
                    value={value}
                    style={styles.dateTimePicker}
                    mode="date"
                    onChange={(e) => {
                      if (
                        e.type === 'set' &&
                        e.nativeEvent.timestamp
                      ) {
                        onChange(new Date(e.nativeEvent.timestamp));
                        methods.trigger('birthDate');
                      }
                    }}
                  />
                  {!!error?.message && (
                    <Text style={styles.errorMessageText}>
                      {error.message}
                    </Text>
                  )}
                </View>
              );
            }}
          />

          <View style={styles.spacing} />

          <Controller
            control={methods.control}
            name="gender"
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => {
              return (
                <View style={styles.genderWrapper}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.genderOptionsWrapper}>
                    {GENDER_OPTIONS.map((genderOption) => (
                      <Pressable
                        key={genderOption}
                        style={[
                          styles.genderOptionPressable,
                          {
                            backgroundColor:
                              value === genderOption
                                ? '#007BFF'
                                : '#F2F2F2',
                          },
                        ]}
                        onPress={() => onChange(genderOption)}
                      >
                        <Text
                          style={[
                            styles.genderOptionText,
                            {
                              color:
                                value === genderOption
                                  ? '#fff'
                                  : '#000',
                            },
                          ]}
                        >
                          {genderOption}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  {!!error?.message && (
                    <Text style={styles.errorMessageText}>
                      {error.message}
                    </Text>
                  )}
                </View>
              );
            }}
          />

          <View style={styles.spacing} />

          <Text style={styles.label}>Should validate with zod</Text>

          <Switch
            value={shouldValidateWithZod}
            onChange={(e) =>
              setShouldValidateWithZod(e.nativeEvent.value)
            }
          />
          <View style={styles.spacing} />

          <Button
            onPress={
              shouldValidateWithZod
                ? () => {
                    /** we could also prevalidate using zod like below */

                    // get current form values
                    const currFormValues = methods.getValues();
                    // https://zod.dev/?id=safeparse
                    const result =
                      signUpFormSchema.safeParse(currFormValues);

                    if (!result.success) {
                      const formattedError = result.error.format();
                      console.log(JSON.stringify(formattedError));
                      Alert.alert(JSON.stringify(formattedError));
                    } else {
                      Alert.alert(
                        'Validation is successful with zod'
                      );
                    }
                  }
                : methods.handleSubmit(onSubmit, onError)
            }
            title="Submit Form"
            color={'#007BFF'}
          />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    color: '#000',
    marginBottom: 6,
    fontSize: 14,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
  },
  dateWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  dateTimePicker: {
    alignSelf: 'flex-start',
  },
  genderWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  genderOptionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  genderOptionPressable: {
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#F2F2F2',
  },
  errorMessageText: {
    color: '#B00020',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  genderOptionText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  spacing: {
    marginBottom: 24,
  },
});
