import { GraphicsProps } from ".";

export function DeckGraphic({
  height = 83,
  width = 91,
  className,
}: GraphicsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 91 83"
      className={className}
    >
      <path
        fill="#CFC5F7"
        d="M85.608 9.169l-5.839-2.445V46.15l10.588-25.586c1.786-4.453-.261-9.561-4.75-11.395zM.646 25.323L22.257 77.5a8.773 8.773 0 003.123 3.931A8.745 8.745 0 0030.143 83a8.82 8.82 0 003.442-.699l32.111-13.316c3.268-1.354 5.272-4.585 5.36-7.816.043-1.135-.175-2.401-.567-3.536L48.704 5.458A8.528 8.528 0 0045.6 1.51 8.501 8.501 0 0040.818 0c-1.133 0-2.266.262-3.355.655L5.395 13.972a8.697 8.697 0 00-4.72 4.69 8.723 8.723 0 00-.029 6.662zm70.366-16.59a8.742 8.742 0 00-2.552-6.175A8.705 8.705 0 0062.298 0H55.98l15.032 36.413"
      ></path>
    </svg>
  );
}
