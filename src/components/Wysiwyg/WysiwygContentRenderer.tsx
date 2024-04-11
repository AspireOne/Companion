export const WysiwygContentRenderer = ({
  html,
}: {
  html: string;
}) => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
