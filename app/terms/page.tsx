import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen pl-4 pt-2 pb-8">
      <div className="max-w-5xl rounded-md">
        <h1 className="scroll-m-20 text-4xl mb-4 font-extrabold tracking-tight lg:text-6xl">
          Conditions Générales d'Utilisation
        </h1>
        <p className="mb-4">
          Dernière mise à jour : <strong>09/01/2025</strong>
        </p>
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="mb-4">
          Bienvenue sur <strong>CheckInPro</strong>. En utilisant notre service,
          vous acceptez les présentes conditions générales d'utilisation (CGU).
          Ces conditions régissent l'accès et l'utilisation de notre site et de
          nos services, notamment la solution d'émargement électronique.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Accès et inscription</h2>
        <p className="mb-4">
          L'accès au service est réservé aux entreprises clientes et à leurs
          employés. Les entreprises inscrivent leurs employés via un espace
          dédié. Les employés reçoivent ensuite un lien sécurisé pour définir
          leur mot de passe et accéder à leur espace personnel.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Utilisation autorisée</h2>
        <p className="mb-4">
          En utilisant <strong>CheckInPro</strong>, vous vous engagez à :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Fournir des informations exactes et à jour lors de votre
            inscription.
          </li>
          <li>Utiliser le service uniquement pour des finalités légitimes.</li>
          <li>Respecter les droits d'autrui et les lois en vigueur.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">
          Obligations et responsabilités
        </h2>
        <p className="mb-4">
          <strong>CheckInPro</strong> s'engage à fournir un service fiable et
          sécurisé. Toutefois, nous ne pouvons garantir l'absence totale
          d'interruptions ou de bugs. En cas de problème, nous nous engageons à
          résoudre les incidents dans les meilleurs délais.
        </p>
        <p className="mb-4">
          En cas de perturbation prolongée affectant nos clients, un
          remboursement partiel pourra être accordé pour le mois concerné.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Limitation de responsabilité
        </h2>
        <p className="mb-4">
          <strong>CheckInPro</strong> ne pourra être tenu responsable des
          dommages indirects ou des pertes de données résultant de l'utilisation
          du service. Les utilisateurs sont responsables de la protection de
          leurs identifiants et mots de passe.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Résiliation</h2>
        <p className="mb-4">
          Les utilisateurs peuvent demander la résiliation de leur compte à tout
          moment en nous contactant. Nous nous réservons également le droit de
          suspendre ou de résilier un compte en cas de violation des présentes
          conditions.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Droit applicable</h2>
        <p className="mb-4">
          Les présentes CGU sont régies par le droit français. En cas de litige,
          les parties s'engagent à privilégier une résolution amiable avant tout
          recours judiciaire.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Modifications des CGU</h2>
        <p className="mb-4">
          Nous nous réservons le droit de modifier ces conditions à tout moment.
          Les utilisateurs seront informés des modifications via une
          notification sur le site. En continuant à utiliser le service après
          les modifications, vous acceptez les nouvelles conditions.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p>
          Pour toute question relative à ces conditions générales d'utilisation,
          veuillez nous contacter à :
          <Link href="mailto:contact@checkinpro.fr" className="text-blue-600">
            {" "}
            contact@checkinpro.fr
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
