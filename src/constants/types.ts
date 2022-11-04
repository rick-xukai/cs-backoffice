export interface FullScreenDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  webkitCancelFullScreen?: () => void;
}

export interface FullScreenDocument extends HTMLDocument {
  documentElement: FullScreenDocumentElement;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  cancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

export interface VideoInterviewAppointmentInfoState {
  status: string;
  started_time: number | null;
  ended_time: number | null;
  step_status: string | null;
  server_time: number | null;
  zoom_link: string;
  timezone: string;
  contact: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  };
}

export interface QuestionState {
  current: {
    step: number;
    question_id: number;
    question_type: string;
    content: string;
    description: string;
    comment: string;
  };
  step_status: Array<{
    step: number;
    step_title: string;
    count: number;
    process: number;
  }>;
  interview_status: string;
  started_time: number | null;
  ended_time: number | null;
  server_time: number | null;
}

export interface IOption {
  label: string;
  value: string;
  disabled?: boolean;
}
