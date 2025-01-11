import ContactForm from "@/components/contact/contactForm";

export default function Contact() {
  return (
    <section className="min-h-screen pl-4 pt-2 pb-8">
      <div className="flex flex-col">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
          Comment nous contacter ?
        </h1>
        <p className="mb-4">
          Pour toute question ou demande d'assistance, vous pouvez nous
          contacter en remplissant le formulaire ci-dessous.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
