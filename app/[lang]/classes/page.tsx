import React from "react"
import Image from "next/image"
import { getDictionary } from "@/i18n/config"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionDivider } from "@/components/section-divider"
import type { Locale } from "@/i18n/config"

// Página del lado del servidor para manejar parámetros de idioma
export default function ClassesPage({ params }: any) {
  // @ts-ignore - Suppress TypeScript warnings for Next.js 15.x params
  const lang = params.lang as Locale
  const dict = getDictionary(lang)

  const classes = [
    {
      id: "darkWizard",
      img: "dark-wizard",
      stats: {
        strength: 18,
        agility: 18,
        vitality: 15,
        energy: 30,
        command: 0,
      },
      skills: ["Energy Ball", "Lightning", "Meteor", "Teleport", "Ice Storm"],
      description: {
        es: "El Dark Wizard es un maestro de la magia elemental, capaz de causar un gran daño a distancia. Su principal atributo es la Energía, que aumenta su poder mágico. Aunque tiene poca defensa, su capacidad para eliminar enemigos rápidamente lo convierte en una clase muy popular.",
        en: "The Dark Wizard is a master of elemental magic, capable of causing great damage at a distance. His main attribute is Energy, which increases his magical power. Although he has little defense, his ability to eliminate enemies quickly makes him a very popular class.",
        pt: "O Dark Wizard é um mestre da magia elemental, capaz de causar grande dano à distância. Seu principal atributo é Energia, que aumenta seu poder mágico. Embora tenha pouca defesa, sua capacidade de eliminar inimigos rapidamente o torna uma classe muito popular.",
      },
    },
    {
      id: "darkKnight",
      img: "dark-knight",
      stats: {
        strength: 28,
        agility: 20,
        vitality: 25,
        energy: 10,
        command: 0,
      },
      skills: ["Twisting Slash", "Death Stab", "Rageful Blow", "Slash", "Falling Slash"],
      description: {
        es: "El Dark Knight es un guerrero poderoso especializado en combate cuerpo a cuerpo. Su principal atributo es la Fuerza, que aumenta su daño físico. Con alta defensa y puntos de vida, es ideal para jugadores que prefieren estar en primera línea de batalla.",
        en: "The Dark Knight is a powerful warrior specialized in melee combat. His main attribute is Strength, which increases his physical damage. With high defense and hit points, it is ideal for players who prefer to be on the front line of battle.",
        pt: "O Dark Knight é um guerreiro poderoso especializado em combate corpo a corpo. Seu principal atributo é Força, que aumenta seu dano físico. Com alta defesa e pontos de vida, é ideal para jogadores que preferem estar na linha de frente da batalha.",
      },
    },
    {
      id: "fairyElf",
      img: "fairy-elf",
      stats: {
        strength: 22,
        agility: 25,
        vitality: 15,
        energy: 20,
        command: 0,
      },
      skills: ["Triple Shot", "Penetration", "Ice Arrow", "Heal", "Defense"],
      description: {
        es: "La Fairy Elf es una arquera ágil con habilidades de apoyo. Su principal atributo es la Agilidad, que aumenta su precisión y velocidad de ataque. Puede atacar a distancia y proporcionar apoyo al grupo con hechizos de curación y defensa.",
        en: "The Fairy Elf is an agile archer with support skills. Her main attribute is Agility, which increases her accuracy and attack speed. She can attack at a distance and provide group support with healing and defense spells.",
        pt: "A Fairy Elf é uma arqueira ágil com habilidades de suporte. Seu principal atributo é Agilidade, que aumenta sua precisão e velocidade de ataque. Ela pode atacar à distância e fornecer suporte ao grupo com feitiços de cura e defesa.",
      },
    },
    {
      id: "magicGladiator",
      img: "magic-gladiator",
      stats: {
        strength: 26,
        agility: 26,
        vitality: 26,
        energy: 26,
        command: 0,
      },
      skills: ["Power Slash", "Fire Burst", "Earthquake", "Lightning Shock", "Spiral Slash"],
      description: {
        es: "El Magic Gladiator es un híbrido que domina tanto la magia como las armas. Puede usar habilidades de Dark Wizard y Dark Knight, lo que lo hace muy versátil. Sus atributos están equilibrados, permitiéndole adaptarse a diferentes situaciones de combate.",
        en: "The Magic Gladiator is a hybrid that masters both magic and weapons. He can use Dark Wizard and Dark Knight skills, making him very versatile. His attributes are balanced, allowing him to adapt to different combat situations.",
        pt: "O Magic Gladiator é um híbrido que domina tanto magia quanto armas. Ele pode usar habilidades de Dark Wizard e Dark Knight, tornando-o muito versátil. Seus atributos são equilibrados, permitindo que ele se adapte a diferentes situações de combate.",
      },
    },
    {
      id: "darkLord",
      img: "dark-lord",
      stats: {
        strength: 26,
        agility: 20,
        vitality: 20,
        energy: 15,
        command: 25,
      },
      skills: ["Fire Burst", "Force Wave", "Dark Horse", "Scepter Power", "Critical Damage"],
      description: {
        es: "El Dark Lord es un comandante de campo con poderosas invocaciones. Su atributo único es el Comando, que le permite invocar criaturas y fortalecer a sus aliados. Es una clase ideal para jugar en grupo y liderar batallas.",
        en: "The Dark Lord is a field commander with powerful summons. His unique attribute is Command, which allows him to summon creatures and strengthen his allies. It is an ideal class for group play and leading battles.",
        pt: "O Dark Lord é um comandante de campo com poderosas invocações. Seu atributo único é Comando, que permite invocar criaturas e fortalecer seus aliados. É uma classe ideal para jogar em grupo e liderar batallas.",
      },
    },
    {
      id: "summoner",
      img: "summoner",
      stats: {
        strength: 21,
        agility: 21,
        vitality: 18,
        energy: 23,
        command: 0,
      },
      skills: ["Drain Life", "Sleep", "Chain Lightning", "Summon Creature", "Decay"],
      description: {
        es: "La Summoner es una invocadora de criaturas mágicas y hechizos. Su principal atributo es la Energía, que aumenta su poder mágico. Puede invocar criaturas para que luchen por ella y lanzar poderosos hechizos de control y daño.",
        en: "The Summoner is a summoner of magical creatures and spells. Her main attribute is Energy, which increases her magical power. She can summon creatures to fight for her and cast powerful control and damage spells.",
        pt: "A Summoner é uma invocadora de criaturas mágicas e feitiços. Seu principal atributo é Energia, que aumenta seu poder mágico. Ela pode invocar criaturas para lutar por ela e lançar poderosos feitiços de controle e dano.",
      },
    },
    {
      id: "rageFighter",
      img: "rage-fighter",
      stats: {
        strength: 32,
        agility: 27,
        vitality: 25,
        energy: 20,
        command: 0,
      },
      skills: ["Dragon Roar", "Chain Drive", "Dark Side", "Phoenix Shot", "Killing Blow"],
      description: {
        es: "El Rage Fighter es un luchador veloz con ataques devastadores. Sus principales atributos son la Fuerza y la Vitalidad. Especializado en combate cuerpo a cuerpo, puede realizar combos de ataques rápidos y poderosos.",
        en: "The Rage Fighter is a fast fighter with devastating attacks. His main attributes are Strength and Vitality. Specialized in melee combat, he can perform combos of fast and powerful attacks.",
        pt: "O Rage Fighter é um lutador rápido com ataques devastadores. Seus principais atributos são Força e Vitalidade. Especializado em combate corpo a corpo, ele pode realizar combos de ataques rápidos e poderosos.",
      },
    },
  ]

  // Modificar el return para incluir el SectionDivider al final
  return (
    <div className="pt-32 pb-24 relative overflow-visible">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">{dict.classes.title}</h1>
          <p className="text-xl text-gold-100 max-w-3xl mx-auto">
            {lang === "es"
              ? "Elige entre siete clases únicas, cada una con sus propias habilidades y estilo de juego."
              : lang === "en"
                ? "Choose from seven unique classes, each with their own skills and gameplay style."
                : "Escolha entre sete classes únicas, cada uma com suas próprias habilidades e estilo de jogo."}
          </p>
        </div>

        <Tabs defaultValue="darkWizard" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-bunker-800 p-1 mb-8">
            {classes.map((classItem) => (
              <TabsTrigger
                key={classItem.id}
                value={classItem.id}
                className="data-[state=active]:bg-gold-600 data-[state=active]:text-bunker-950"
              >
                {dict.classes[classItem.id].name}
              </TabsTrigger>
            ))}
          </TabsList>

          {classes.map((classItem) => (
            <TabsContent key={classItem.id} value={classItem.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Card className="bg-bunker-800 overflow-hidden h-full">
                    <div className="relative h-80 lg:h-full">
                      <Image
                        src={`/placeholder-graphic.png?height=600&width=400&text=${classItem.img.replace("-", " ")}`}
                        alt={dict.classes[classItem.id].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  <Card className="bg-bunker-800 overflow-hidden mb-8">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gold-300 mb-4">{dict.classes[classItem.id].name}</h2>
                      <p className="text-gold-100 mb-6">{classItem.description[lang as "es" | "en" | "pt"]}</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-sm text-gold-400 mb-1">STR</div>
                          <div className="text-2xl font-bold text-gold-300">{classItem.stats.strength}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gold-400 mb-1">AGI</div>
                          <div className="text-2xl font-bold text-gold-300">{classItem.stats.agility}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gold-400 mb-1">VIT</div>
                          <div className="text-2xl font-bold text-gold-300">{classItem.stats.vitality}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gold-400 mb-1">ENE</div>
                          <div className="text-2xl font-bold text-gold-300">{classItem.stats.energy}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gold-400 mb-1">CMD</div>
                          <div className="text-2xl font-bold text-gold-300">{classItem.stats.command}</div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gold-300 mb-3">
                        {lang === "es"
                          ? "Habilidades principales"
                          : lang === "en"
                            ? "Main Skills"
                            : "Habilidades principais"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {classItem.skills.map((skill, index) => (
                          <div key={index} className="flex items-center bg-bunker-900 p-3 rounded-md">
                            <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center mr-3">
                              <span className="text-gold-400 text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gold-100">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Divisor al final de la página - como elemento independiente */}
      <SectionDivider />
    </div>
  )
}
