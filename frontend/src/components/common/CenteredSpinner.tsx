import LoadingSpinner from "./LoadingSpinner";

export default function CenteredSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
