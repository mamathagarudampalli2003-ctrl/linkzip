export default function TermsOfService() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Terms of Service
      </h1>

      <p>
        By using LinkZip, you agree to these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Acceptable Use
      </h2>

      <ul className="list-disc ml-6 space-y-2">
        <li>No spam links</li>
        <li>No illegal content</li>
        <li>No malicious redirects</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Account Termination
      </h2>

      <p>
        We reserve the right to suspend abusive accounts.
      </p>
    </div>
  );
}