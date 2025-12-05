import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, Leaf, Laptop, Euro, Users } from 'lucide-react';

export default function NirdBudgetSimulator() {
  const [students, setStudents] = useState(500);
  const [computers, setComputers] = useState(100);
  const [years, setYears] = useState(5);
  const [showResults, setShowResults] = useState(false);

  // Calculs Microsoft
  const msLicensePerDevice = 150; // Windows + Office par an
  const msCloudPerStudent = 5; // Microsoft 365 par étudiant par mois
  const msReplacementRate = 0.25; // 25% des machines à remplacer chaque année (obsolescence)
  const computerPrice = 500;

  const msCostPerYear = (computers * msLicensePerDevice) + (students * msCloudPerStudent * 12);
  const msReplacementCost = (computers * msReplacementRate * computerPrice * years);
  const msTotalCost = (msCostPerYear * years) + msReplacementCost;
  const msComputersWasted = Math.floor(computers * msReplacementRate * years);

  // Calculs NIRD (Linux)
  const nirdLicenseCost = 0; // Gratuit
  const nirdCloudPerStudent = 0; // Solutions libres auto-hébergées ou gratuites
  const nirdFormationCost = 2000; // Formation initiale une fois
  const nirdMaintenancePerYear = 500; // Maintenance légère
  const nirdReplacementRate = 0.08; // Seulement 8% (matériel vit plus longtemps)
  
  const nirdCostPerYear = nirdMaintenancePerYear + (students * nirdCloudPerStudent * 12);
  const nirdReplacementCost = (computers * nirdReplacementRate * computerPrice * years);
  const nirdTotalCost = nirdFormationCost + (nirdCostPerYear * years) + nirdReplacementCost;
  const nirdComputersWasted = Math.floor(computers * nirdReplacementRate * years);

  // Économies
  const savings = msTotalCost - nirdTotalCost;
  const computersSaved = msComputersWasted - nirdComputersWasted;
  const co2Saved = computersSaved * 200; // ~200kg CO2 par ordinateur

  // Équivalences sympathiques
  const tabletsEquivalent = Math.floor(savings / 300);
  const treesEquivalent = Math.floor(co2Saved / 20);

  useEffect(() => {
    if (students > 0 && computers > 0) {
      setShowResults(true);
    }
  }, [students, computers, years]);

  const formatEuro = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Simulateur de Budget NIRD
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez combien votre établissement peut économiser en passant au libre
          </p>
        </div>

        {/* Paramètres */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Paramètres de votre établissement
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Nombre d'élèves */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nombre d'élèves
              </label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-3xl font-bold text-blue-600">{students}</span>
                <span className="text-gray-600 ml-2">élèves</span>
              </div>
            </div>

            {/* Nombre d'ordinateurs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nombre d'ordinateurs
              </label>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={computers}
                onChange={(e) => setComputers(Number(e.target.value))}
                className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-3xl font-bold text-green-600">{computers}</span>
                <span className="text-gray-600 ml-2">ordinateurs</span>
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Projection sur
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">
                <span className="text-3xl font-bold text-purple-600">{years}</span>
                <span className="text-gray-600 ml-2">ans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats comparatifs */}
        {showResults && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Scénario Big Tech */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-8 text-white transform transition-all hover:scale-105">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-white/20 rounded-lg p-2 mr-3">💼</span>
                Scénario Big Tech
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Coût total sur {years} ans</div>
                  <div className="text-4xl font-bold">{formatEuro(msTotalCost)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-xs opacity-90">Licences/an</div>
                    <div className="text-xl font-bold">{formatEuro(msCostPerYear)}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-xs opacity-90">Remplacement</div>
                    <div className="text-xl font-bold">{formatEuro(msReplacementCost)}</div>
                  </div>
                </div>

                <div className="bg-red-900/30 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Ordinateurs jetés</div>
                    <div className="text-2xl font-bold">{msComputersWasted}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scénario NIRD */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white transform transition-all hover:scale-105">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-white/20 rounded-lg p-2 mr-3">🌱</span>
                Scénario NIRD
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Coût total sur {years} ans</div>
                  <div className="text-4xl font-bold">{formatEuro(nirdTotalCost)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-xs opacity-90">Maintenance/an</div>
                    <div className="text-xl font-bold">{formatEuro(nirdCostPerYear)}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-xs opacity-90">Formation initiale</div>
                    <div className="text-xl font-bold">{formatEuro(nirdFormationCost)}</div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Ordinateurs jetés</div>
                    <div className="text-2xl font-bold">{nirdComputersWasted}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Économies réalisées */}
        {showResults && savings > 0 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-2xl p-8 mb-6 text-gray-900">
            <h2 className="text-3xl font-bold mb-6 text-center">
              💰 Vous économisez {formatEuro(savings)} !
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/90 rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                <Euro className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <div className="text-sm text-gray-600 mb-2">Économie totale</div>
                <div className="text-3xl font-bold text-green-600">{formatEuro(savings)}</div>
                <div className="text-xs text-gray-500 mt-2">Sur {years} ans</div>
              </div>

              <div className="bg-white/90 rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                <Laptop className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <div className="text-sm text-gray-600 mb-2">Ordinateurs sauvés</div>
                <div className="text-3xl font-bold text-blue-600">{computersSaved}</div>
                <div className="text-xs text-gray-500 mt-2">Évités à la poubelle</div>
              </div>

              <div className="bg-white/90 rounded-xl p-6 text-center transform hover:scale-105 transition-all">
                <Leaf className="w-12 h-12 mx-auto mb-3 text-green-600" />
                <div className="text-sm text-gray-600 mb-2">CO₂ économisé</div>
                <div className="text-3xl font-bold text-green-600">{co2Saved} kg</div>
                <div className="text-xs text-gray-500 mt-2">Empreinte carbone</div>
              </div>
            </div>
          </div>
        )}

        {/* Équivalences */}
        {showResults && savings > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🎯 Avec ces économies, vous pourriez...
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="text-6xl mb-3">📱</div>
                <div className="text-lg text-gray-700">Acheter</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{tabletsEquivalent} tablettes</div>
                <div className="text-sm text-gray-600">à 300€ pièce pour vos élèves</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <div className="text-6xl mb-3">🌳</div>
                <div className="text-lg text-gray-700">Équivalent à planter</div>
                <div className="text-4xl font-bold text-green-600 mb-2">{treesEquivalent} arbres</div>
                <div className="text-sm text-gray-600">en termes de compensation CO₂</div>
              </div>
            </div>
          </div>
        )}

        {/* Détails techniques */}
        {showResults && (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <TrendingDown className="w-6 h-6 mr-2" />
              Détails du calcul
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-red-400">Big Tech</h4>
                <ul className="space-y-1 opacity-90">
                  <li>• Licence Windows + Office : {msLicensePerDevice}€/an/poste</li>
                  <li>• Cloud Microsoft 365 : {msCloudPerStudent}€/mois/élève</li>
                  <li>• Taux de remplacement : {msReplacementRate * 100}% par an</li>
                  <li>• Prix ordinateur neuf : {computerPrice}€</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-green-400">NIRD (Linux + Libre)</h4>
                <ul className="space-y-1 opacity-90">
                  <li>• Licences logicielles : 0€ (libres)</li>
                  <li>• Formation initiale : {nirdFormationCost}€ (une fois)</li>
                  <li>• Maintenance annuelle : {nirdMaintenancePerYear}€</li>
                  <li>• Taux de remplacement : {nirdReplacementRate * 100}% par an</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm opacity-75 text-center">
                Ces calculs sont basés sur des moyennes observées dans des établissements ayant migré vers NIRD.
                Les résultats peuvent varier selon votre contexte spécifique.
              </p>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-8 pb-8">
          <a
            href="https://nird.forge.apps.education.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
          >
            En savoir plus sur la démarche NIRD →
          </a>
        </div>
      </div>
    </div>
  );
}
