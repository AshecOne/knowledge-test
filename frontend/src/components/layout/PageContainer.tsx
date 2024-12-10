interface PageContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const PageContainer = ({
  title,
  description,
  children,
}: PageContainerProps) => (
  <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="px-4 sm:px-0 mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
    <div className="bg-white shadow rounded-lg p-6">{children}</div>
  </div>
);
