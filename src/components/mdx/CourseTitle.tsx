const CourseTitle = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
      <div className="mt-4 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
    </div>
  );
};

export default CourseTitle;
