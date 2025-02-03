type ErrorResponse = {
  message: string;
  success: boolean;
};

type UserSliceType = {
  currentUser: [] | any;
  loading: boolean;
  error: ErrorResponse | null;
};

const initialState: UserSliceType = {
  currentUser: null,
  loading: false,
  error: null,
};

export default initialState;
