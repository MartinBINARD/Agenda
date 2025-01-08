import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";
import { colors } from "../../constants/colors";
import { useCreateEventMutation, useDeleteEventMutation, useGetAllEventsQuery, useUpdateEventMutation } from "../../store/api/agendaApi";
import ErrorOverlay from "../overlay/ErrorOverlay";
import LoadingOverlay from "../overlay/LoadingOverlay";
import CustomBtn from "./CustomBtn";
import DateTimePicker from "./DateTimePicker";
import ErrorModal from "./ErrorModal";
import Input from "./Input";
import IsOnline from "./IsOnline";

export default function FormWithFormik({ isFormVisible, closeForm, selectedEvent }) {
  // const event = useSelector((state) =>
  //   state.agenda.events.find((event) => event.id === selectedEvent)
  // );
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  // const [httpError, setHttpError] = useState(false);
  
  const closeKeyboardHandler = () => Keyboard.dismiss();
  const {data: event, error} = useGetAllEventsQuery(undefined, {
    skip: !selectedEvent,
    selectFromResult: ({ data, error }) => ({
      data: data?.find(item => item.id === selectedEvent)
    })
  });
  const [createEvent, { isLoading: isCreating, error: createError, isSuccess: isCreated }] = useCreateEventMutation();

  const [updateEvent, { isLoading: isUpdating, error: updateError, isSuccess: isUpdated }] = useUpdateEventMutation();

  const [deleteEvent, { isLoading: isDeleting, error: deleteError, isSuccess: isDeleted}] = useDeleteEventMutation();

  const initialState = event ? event : {
    title: "",
    location: "",
    phoneNumber: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    isOnline: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est obligatoire"),
    isOnline: Yup.boolean(),
    location: Yup.string().when("isOnline", {
      is: true,
      then: (schema) => schema.url("L'url est invalide").notRequired(),
      otherwise: (schema) => schema.notRequired(),
    }),
    phoneNumber: Yup.string().matches(/^[0-9]\d{9}$/, {
      message: "Le numéro de téléphone est incorrect",
    }),
    startDate: Yup.date(),
    endDate: Yup.date().min(
      Yup.ref("startDate"),
      "La fin de l'événement doit être après le début"
    ),
  });

  // const httpEventHandler = async (data, httpFn, reducer, setLoadingSate) => {
  //   setLoadingSate(true);
  //   try {
  //     const newEventId = await httpFn(data);
  //     if (!data.id) {
  //       data.id = newEventId;
  //     }
  //     dispatch(reducer(data));
  //     setLoadingSate(false);
  //     closeForm();
  //   } catch (error) {
  //     setLoadingSate(false);
  //     setHttpError(true);
  //     setTimeout(() => {
  //       closeForm();
  //       setHttpError(false);
  //     }, 4000);
  //   }
  // };

  const onSubmit = async (values) => {
    const data = {
      title: values.title,
      location: values.location,
      phoneNumber: values.phoneNumber,
      description: values.description,
      startDate: new Date(values.startDate).toUTCString(),
      endDate: new Date(values.startDate).toUTCString(),
      isOnline: values.isOnline,
    };

    if (event?.id) {
      data.id = event.id;
      updateEvent(data);
    } else {
      createEvent(data);
    }
  };

  const removeEvt = () => {
    if (event) {
      deleteEvent({ id: event.id });
    } else {
      closeForm();
    }
  };

  useEffect(() => {
    if (isCreated || isUpdated || isDeleted) {
      closeForm();
    }
  }, [isCreated, isUpdated, isDeleted]);

  return (
    <Modal
      visible={isFormVisible}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <Pressable style={styles.formContainer} onPress={closeKeyboardHandler}>
        <View style={styles.headerContainer}>
          <Text style={styles.formTitle}>{ selectedEvent ? "Modifier l'événement" : "Nouvel événement" }</Text>
          {isDeleting ? (
            <ActivityIndicator color={colors.LIGHT} size="small" />
          ) : (
            <Feather
              name="trash-2"
              size={28}
              color={colors.LIGHT}
              onPress={removeEvt}
              suppressHighlighting={true}
            />
          )}
        </View>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            touched,
            status,
            setStatus,
            isSubmitting
          }) => {
            if (isSubmitting && Object.keys(errors).length && status !== "error") {
              setStatus("error");
            }
          return (
            <>
              <Input
                label="Titre"
                autoCorrect={false}
                maxLength={40}
                value={values.title}
                onChangeText={handleChange("title")}
                error={errors.title && touched.title}
                />
              <Input
                label={values.isOnline ? "Url" : "Lieu"}
                inputMode={values.isOnline ? "url" : "text"}
                autoCorrect={false}
                maxLength={40}
                value={values.location}
                onChangeText={handleChange("location")}
                error={errors.location && touched.location}
                />
              <Input
                label="Téléphone"
                inputMode="tel"
                maxLength={10}
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                error={errors.phoneNumber && touched.phoneNumber}
                />
              <Input
                label="Description"
                multiline
                maxLength={120}
                value={values.description}
                onChangeText={handleChange("description")}
                />
              <DateTimePicker
                label="Début"
                dateTime={values.startDate}
                setDateTime={(date) => setFieldValue("startDate", date)}
                />
              <DateTimePicker
                label="Fin"
                dateTime={values.endDate}
                setDateTime={(date) => setFieldValue("endDate", date)}
                error={errors.endDate}
                />
              <IsOnline
                isEnabled={values.isOnline}
                setIsEnabled={(value) => setFieldValue("isOnline", value)}
                />
              <View style={styles.btnContainer}>
                <CustomBtn text="Annuler" color={colors.PINK} onPress={closeForm} />
                <CustomBtn
                  text="Valider"
                  color={colors.VIOLET}
                  onPress={handleSubmit}
                  isLoading={isCreating || isUpdating}
                />
              </View>
              <ErrorModal
                isModalVisible={status == "error"}
                closeModal={setStatus}
                errors={errors}
              />
              {isCreating || isUpdating || isDeleting ? <LoadingOverlay /> : null}
              {createError || updateError || deleteError ? <ErrorOverlay /> : null}
            </>
          )}}
        </Formik>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.DARK,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});