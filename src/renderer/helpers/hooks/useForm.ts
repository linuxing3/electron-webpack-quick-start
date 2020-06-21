import React, { useState, useEffect, useRef } from "react";
export interface FormHook<T> {
  values: T;
  errors: any;
  touched: any;
  onSubmitting: boolean;
  onBlur: boolean;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.ChangeEvent<any>) => void;
  handleSubmit: (event: any) => void;
}

export interface IUseFormOptions<T> {
  initialValues: T;
  onSubmit: (data: { values: T; errors: any }) => any;
}

export declare function UseForm<T>(options: IUseFormOptions<T>): FormHook<T>;

const useForm: typeof UseForm = ({
  initialValues,
  onSubmit
}: IUseFormOptions<any>): FormHook<any> => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState<boolean>(false);
  const [onBlur, setOnBlur] = useState<boolean>(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (!formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setOnSubmitting(false);
      setOnBlur(false);
    }
    formRendered.current = false;
  }, [initialValues]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
};

  const handleBlur = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
};

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ values, errors });
  };

  return {
    values,
    errors,
    touched,
    onSubmitting,
    onBlur,
    handleChange,
    handleBlur,
    handleSubmit
  };
};

export default useForm;