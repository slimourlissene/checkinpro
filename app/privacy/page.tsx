import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen pl-4 pt-2 pb-8">
      <div className="max-w-4xl rounded-md">
        <h1 className="text-3xl font-bold mb-4">
          Politique de Confidentialité
        </h1>
        <p className="mb-4">
          Dernière mise à jour : <strong>09/01/2025</strong>
        </p>
        <p className="mb-4">
          CheckInPro, exploité par Slim OURLISSENE, s'engage à protéger la
          confidentialité de vos données. Cette politique de confidentialité
          décrit comment nous collectons, utilisons et protégeons vos
          informations personnelles lorsque vous utilisez notre site.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Informations collectées</h2>
        <p className="mb-4">Nous collectons deux types d'informations :</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Informations personnelles :</strong> Cela inclut votre
            prénom, nom, adresse e-mail, et mot de passe (hashé).
          </li>
          <li>
            <strong>Informations non personnelles :</strong> Données anonymes
            comme le type de navigateur, la provenance des utilisateurs (URL
            référent), ou les préférences enregistrées via des cookies.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">
          Utilisation des informations
        </h2>
        <p className="mb-4">
          Les informations collectées sont utilisées pour :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Créer et gérer les comptes utilisateurs.</li>
          <li>Fournir l'accès sécurisé aux espaces clients.</li>
          <li>Améliorer la qualité de nos services.</li>
          <li>
            Respecter les obligations légales ou répondre à des demandes
            officielles.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Partage des données</h2>
        <p className="mb-4">
          Nous ne partageons jamais vos données personnelles avec des tiers à
          des fins commerciales. Cependant, nous pouvons les transmettre à des
          prestataires de services (hébergement, maintenance, etc.) dans le
          cadre de l'exploitation de notre plateforme, sous réserve de mesures
          de confidentialité strictes.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Protection des informations
        </h2>
        <p className="mb-4">
          Nous mettons en place des mesures de sécurité techniques et
          organisationnelles, comme le chiffrement des mots de passe, pour
          protéger vos données contre tout accès non autorisé. Cependant, aucun
          système n'étant infaillible, nous vous encourageons à garder vos
          identifiants confidentiels.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Vos droits</h2>
        <p className="mb-4">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Accès à vos données personnelles.</li>
          <li>Correction ou mise à jour de vos données.</li>
          <li>Suppression de vos informations sur demande explicite.</li>
          <li>Opposition à leur traitement dans certains cas.</li>
        </ul>
        <p className="mb-4">
          Pour exercer ces droits, veuillez nous contacter à l'adresse :{" "}
          <Link href="mailto:contact@checkinpro.fr" className="text-blue-600">
            contact@checkinpro.fr
          </Link>
          .
        </p>
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          Nous utilisons uniquement des cookies essentiels à l'authentification
          et au bon fonctionnement du site. Ces cookies ne collectent aucune
          donnée personnelle sans votre consentement explicite.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Modification de la politique
        </h2>
        <p className="mb-4">
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Toute mise à jour sera communiquée sur
          cette page avec la date de révision. Nous vous encourageons à
          consulter régulièrement cette politique.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p>
          Pour toute question relative à cette politique de confidentialité ou à
          vos données personnelles, veuillez nous contacter à :{" "}
          <Link href="mailto:contact@checkinpro.fr" className="text-blue-600">
            contact@checkinpro.fr
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
