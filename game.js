'use strict';

// =========================================
// STILL HOLLOW — game engine + content
// =========================================

const SAVE_KEY = 'stillHollow_v1';

function loadSave() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; }
  catch { return {}; }
}
function writeSave(d) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); }
  catch {}
}

const saved = loadSave();
let foundEndings = new Set(saved.foundEndings || []);
let playCount = saved.playCount || 0;

// =========================================
// SCENE DATA
// =========================================

const SCENES = {

  // ---- TITLE ----
  title: { type: 'title' },

  // ---- CORRIDOR ----
  corridor: {
    bg: 'bg-default',
    paragraphs: [
      `You wake in a hallway that is too narrow.`,
      `Or you are too wide.`,
      `It is difficult to say. You try to remember which one you were before — before whatever brought you here, before the smell and the wallpaper and the impossible knowing — and you cannot find the answer. The direction you need to look does not appear to exist.`,
      `The wallpaper is covered in children's drawings. Houses with smoking chimneys. Stick figures holding hands. Suns with too many rays, as if the child who drew them could not decide when to stop. The paper is peeling at the edges. Behind it: more drawings. Older. The same houses. The same hands.`,
      `You drew these. You are certain of this. You also cannot have drawn these. This is not a contradiction you can resolve right now.`,
      `At one end of the hallway: a yellow light. The smell of something burning sweet. A birthday cake left in the oven past the point of celebration, past the point of salvage, into something else entirely.`,
      `At the other end: a sound. Small and rhythmic. Breathing, maybe. Or swallowing. It is very hard to tell.`,
      `The hallway is getting narrower. You must choose.`,
    ],
    choices: [
      { text: 'Move toward the light', next: 'kitchen' },
      { text: 'Move toward the sound', next: 'nursery' },
      { text: 'Try the front door', next: 'garden' },
      { text: 'Step into the study', next: 'study', condition: () => foundEndings.size >= 2 },
    ],
  },

  // ---- GARDEN ----
  garden: {
    bg: 'bg-garden',
    paragraphs: [
      `The front door opens easily.`,
      `You weren't expecting that.`,
      `Outside is outside. A garden. Moonlight, or something moonlight-shaped. The smell of wet earth and growing things. You feel the tightness in your chest ease slightly. There is distance here. Sky. You can breathe in more than one direction.`,
      `You take four steps down the path and stop.`,
      `The garden is growing wrong.`,
      `Not dramatically wrong. Not impossible wrong. Wrong the way a mispronounced name is wrong — close enough that you almost let it pass, wrong enough that your body registers it before your mind does. The proportions of the plants are slightly off. The leaves angle toward something that is not the moon. In the leftmost raised bed, there is a shape pressed down into the soil, and it is the shape of a person: arms at the sides, fingers spread wide, the impression of a face turned gently to one side.`,
      `You look at the other beds.`,
      `Each one has a shape in it.`,
      `Some have been here long enough that moss has settled over them. Long enough that you cannot tell where the shape ends and the ground begins. The garden extends further than the house could reasonably have a garden. You begin to count and decide not to finish.`,
    ],
    choices: [
      { text: 'Approach the nearest shape', next: 'garden_shape' },
      { text: 'Go back inside', next: 'corridor' },
      { text: 'Keep walking, deeper into the garden', next: 'garden_deep' },
    ],
  },

  garden_shape: {
    bg: 'bg-garden',
    paragraphs: [
      `You kneel beside the shape in the nearest bed.`,
      `It is exactly your size.`,
      `Not approximately. Not roughly. Exactly — the precise length of your legs, the specific width of your shoulders, the way your hands rest when you are not paying attention to them. This is the space you take up in the world, pressed permanently into cultivated earth.`,
      `The moss over it is warm.`,
      `You reach down and touch the hollow where a face would be. Your palm fits perfectly. Below the surface, something shifts — not a waking movement, something slower. Something settling.`,
      `"It's for you," says a voice behind you.`,
      `You turn. Nothing there but garden. Rows of occupied beds extending into the dark.`,
      `"We keep them ready," the voice continues, rising from the direction of the soil itself. "Some of you come here first. Some of you come here last. Some of you were always going to end up here. We keep them ready."`,
      `The hollow under your palm is warmer than it was.`,
    ],
    choices: [
      { text: 'Lie down in it', next: 'ending_garden' },
      { text: 'Stand up and go back inside', next: 'corridor' },
    ],
  },

  garden_deep: {
    bg: 'bg-garden',
    paragraphs: [
      `You keep walking.`,
      `The garden extends for what should be impossible: row after row of cultivated beds, each one tended, each one occupied. The shapes in the earth are not all your size. Some are larger — wide and long, made for something that grew past stopping. Some are very small. Some are so old that nothing remains but the indentation, the memory of a silhouette that the earth has not yet forgotten.`,
      `At the far end, there is a gate. Beyond the gate: open field, distance, wind, the suggestion of somewhere else entirely.`,
      `You stand at the gate and rest your hand on the latch.`,
      `You understand that walking through it would mean leaving. Not escaping into another room. Leaving — the house, the garden, all of it. On the other side could be a road. A life. The rest of your life, ordinary and yours.`,
      `You look back.`,
      `The lights in the house are on. A silhouette stands at the upstairs window, the right size for you, the right posture. It lifts one hand in a slow, patient wave.`,
      `It is wearing your hands.`,
    ],
    choices: [
      { text: 'Open the gate and walk through', next: 'garden_gate' },
      { text: 'Let go of the latch', next: 'garden_shape' },
    ],
  },

  garden_gate: {
    bg: 'bg-garden',
    paragraphs: [
      `You push the gate open.`,
      `The latch gives easily. The hinges don't make a sound.`,
      `You step through.`,
      `For a moment, you feel it: the specific physical sensation of leaving. The house releasing its claim. The air outside tasting different than the air inside. You keep walking. The field opens up around you. The gate behind you stays open.`,
      `You walk until the house is small, then smaller, then gone behind the dark.`,
      `You don't look back again. You already know what you saw in the window.`,
      `In the morning, a week from now, a year from now, you will be somewhere ordinary. You will be fine. You will eat meals and speak to people and sleep through most nights without incident.`,
      `But there will be mornings when you wake with your fingers spread against the mattress, pressed flat the way they press when something is trying to hold a shape, and you will lie still until you remember which direction time is moving.`,
      `You got out.`,
      `You are the first.`,
    ],
    choices: [
      { text: 'Continue', next: 'ending_gate' },
    ],
  },

  // ---- KITCHEN ----
  kitchen: {
    bg: 'bg-warm',
    paragraphs: [
      `The kitchen is enormous.`,
      `The ceiling is too far up to see clearly. The countertops are too high to reach without effort. Everything is scaled for something larger than you, or you are smaller than you thought, or both — you cannot determine which is correct and you are not sure the kitchen cares.`,
      `A pot sits on the stove, boiling. The steam smells like birthdays — specifically, like the feeling of getting older without wanting to. Like the exact moment a party ends and everyone has gone home and you are still wearing the hat, alone in a room that already feels like the past.`,
      `On the wall beside the refrigerator: growth marks. Pencil lines with years written beside them. A record of a child's height, year by year, the kind of record people keep to prove the child was real.`,
      `The marks continue up past where a child would stop. Past where a person would stop. Past where anything should stop.`,
      `Your name is written at the very bottom. And at the very top.`,
    ],
    choices: [
      { text: 'Check the growth marks', next: 'growth_marks' },
      { text: 'Look in the pot', next: 'the_pot' },
      { text: 'Open the cabinet under the sink', next: 'the_cabinet' },
    ],
  },

  growth_marks: {
    bg: 'bg-warm',
    paragraphs: [
      `You run your finger along the bottom mark.`,
      `The date beside it is the year you were born. The height is correct in the way that only your own measurements can be correct — not information but recognition, the body knowing itself.`,
      `You trace upward. Year by year. You watch yourself grow in pencil lines. You remember, without meaning to, what it felt like to be measured: standing straight against a wall, the flat edge of something pressing your hair down, trying to be exactly as tall as you actually were.`,
      `The handwriting changes around the middle measurements. Becomes shakier. Like someone who was afraid while writing, or like someone very young trying to write very carefully.`,
      `The measurements keep going. The years keep advancing. You are decades older in pencil lines, taller than any person should be, still being measured, still being kept track of.`,
      `The last mark is at the level of your eye. The date beside it is tomorrow.`,
      `There is something at the back of the kitchen — a door you didn't see before, small and paint-chipped, left ajar. Behind it: the smell of flour and something older than flour.`,
    ],
    choices: [
      { text: 'Look through the pantry door', next: 'pantry' },
      { text: 'Look in the pot', next: 'the_pot' },
      { text: 'Leave the kitchen', next: 'nursery_from_kitchen' },
    ],
  },

  pantry: {
    bg: 'bg-warm',
    paragraphs: [
      `The pantry is narrow and tall. Shelves on both sides, reaching up into darkness. Most of them hold ordinary things — canned goods, a flour tin, something in a jar that is difficult to identify without looking too long at it. You decide not to look too long at it.`,
      `On the lowest shelf: a photograph, face down.`,
      `On the floor, tucked against the baseboard: a folded piece of paper.`,
      `The photograph and the paper are both old. Both have been here for some time. Neither has been put away.`,
    ],
    choices: [
      { text: 'Pick up the photograph', next: 'pantry_photo' },
      { text: 'Unfold the paper', next: 'pantry_note' },
      { text: 'Go back to the kitchen', next: 'kitchen' },
    ],
  },

  pantry_photo: {
    bg: 'bg-warm',
    paragraphs: [
      `It is a family photograph.`,
      `Formal, posed. A house behind them — this house, recognizably, in better condition. Two adults and a child. The child stands between them with the careful posture of someone who has been told to stand still many times.`,
      `You look at the child's face for a long time.`,
      `You look at the adults' faces for a shorter time. There is something wrong with the way they are looking at the child, or there is something wrong with the way you are looking at the photograph, and you cannot tell which.`,
      `On the back of the photograph, in small neat writing: a date. And below the date: a list of names. The child's name is your name.`,
      `Below the names, in different handwriting — shakier, younger: *We were happy here. I think we were happy. I am trying to remember correctly.*`,
      `The jar on the shelf above you moves slightly. You do not look at it.`,
    ],
    choices: [
      { text: 'Put the photograph back', next: 'pantry' },
      { text: 'Keep it and go back to the kitchen', next: 'kitchen' },
    ],
  },

  pantry_note: {
    bg: 'bg-warm',
    paragraphs: [
      `The paper has been folded many times.`,
      `Inside, in a child's handwriting — large, effortful, the letters slightly uneven from pressing too hard with the pencil:`,
      `*RULES FOR THE HOUSE*\n*1. Don't make the house unhappy.*\n*2. If the house is unhappy you will know.*\n*3. Don't leave without asking.*\n*4. If you leave without asking it will wait.*\n*5. The house always waits.*\n*6. Some people come back. They don't mean to.*\n*7. It is not their fault.*\n*8. The house is not angry.*\n*9. It is just very hungry and it does not know another way.*`,
      `At the bottom, in adult handwriting — the same handwriting from the photograph, the careful one:`,
      `*I found this under the floorboard in the nursery. I don't know who wrote it. I don't know when. I'm leaving it here in case it's useful to whoever comes next. I'm sorry I couldn't do better than this.*`,
      `The paper is warm in your hands.`,
    ],
    choices: [
      { text: 'Fold it back up', next: 'pantry' },
      { text: 'Take it with you', next: 'kitchen' },
    ],
  },

  the_cabinet: {
    bg: 'bg-warm',
    paragraphs: [
      `You open the cabinet under the sink.`,
      `There are no cleaning supplies.`,
      `There is a door.`,
      `Sized for something small. Sized for something that used to be small, or for something that has learned to make itself small when it needs to. The wood is worn smooth in two spots — where hands have pushed through, many times, from both directions.`,
      `From the other side: the sound of breathing. Small and slow, the way things breathe when they have been asleep for a long time and are not quite sure they want to wake up.`,
    ],
    choices: [
      { text: 'Crawl through', next: 'nursery_from_cabinet' },
      { text: 'Close the cabinet', next: 'kitchen' },
    ],
  },

  the_pot: {
    bg: 'bg-warm',
    paragraphs: [
      `You look in.`,
      `The liquid is the color of old photographs — not the subjects of photographs, but the photographs themselves. The particular amber-brown of time made physical and then slowly dissolving.`,
      `Something is in it.`,
      `It rises, the way things rise when they have been submerged long enough: slowly, without urgency, as if surfacing is just one of many options and not particularly the most important one.`,
      `It is your face.`,
      `Not exactly your face. The version of your face that has been kept here — the face that stayed when you left, or the face you left behind, and you cannot determine the order of operations. It is wet and soft in the way things get after long immersion. It opens its eyes.`,
      `They are your eyes. They recognize you the way a wound recognizes whatever made it.`,
      `Its mouth opens. It does not speak. It waits.`,
    ],
    choices: [
      { text: 'Reach into the pot', next: 'ending_hungry' },
      { text: 'Step back and say nothing', next: 'waiting_at_pot' },
      { text: 'Cover the pot and leave', next: 'mirror_approach' },
    ],
  },

  waiting_at_pot: {
    bg: 'bg-warm',
    paragraphs: [
      `You do nothing.`,
      `It waits.`,
      `You wait.`,
      `The house waits. The steam continues. The liquid turns gently. Your face in the pot does not blink; you aren't sure you're blinking either.`,
      `This could go on. Perhaps it has.`,
      `Slowly — with the patience of something that has all the time there is — it begins to climb out. First the hands, pressing flat against the pot's rim. Then the shoulders, wet, pulling forward. It doesn't look at you while it does this. It knows exactly where you are.`,
      `The kitchen smells like the first thing you can remember. Earlier than that.`,
    ],
    choices: [
      { text: 'Reach for it', next: 'ending_hungry' },
      { text: 'Run', next: 'mirror_approach' },
    ],
  },

  mirror_approach: {
    bg: 'bg-mirror',
    paragraphs: [
      `You back out of the room you were in, into a room you don't remember.`,
      `There is a mirror.`,
      `This is not, by itself, unusual. Mirrors exist in houses. This is a house. You are in a hallway between rooms that may or may not have existed a moment ago. There is a mirror.`,
      `The figure in the mirror is not quite showing you what you look like.`,
      `It is close. Close enough that you might convince yourself, if you wanted to. But the proportions are wrong in a specific way: it is the proportions of a child's drawing of a person — all the right elements, all the right placement, but the relationships between them are slightly off. The head is too heavy. The hands are too large. The distance between the eyes and the mouth is not quite the distance you know.`,
      `The figure does not move when you move.`,
      `It watches you with the specific patience of something that has been waiting in this particular spot for a specific person to arrive. It waited a long time. It is not angry about this. It just waited.`,
      `The hallway behind you is no longer there.`,
    ],
    choices: [
      { text: 'Break the mirror', next: 'ending_escape' },
      { text: 'Step through', next: 'ending_dissolution' },
    ],
  },

  // ---- NURSERY (three entry points) ----
  nursery: {
    bg: 'bg-cold',
    paragraphs: [
      `The nursery is the size of a country.`,
      `Or the scale is simply wrong in the way everything in this house is wrong — everything feels as though it was built for different proportions, as though size here is not fixed but suggested. A crib stands at the center of the room. The bars extend upward into a darkness that the ceiling light does not reach. Whatever is inside would have to be very large to need bars this high. Or whatever built this crib was planning for something to grow.`,
      `The mobile above turns slowly: paper shapes. A house. A pair of hands. An eye. The pattern repeats: house, hands, eye. House, hands, eye. It has been repeating long enough that the string is worn smooth where it loops over the hook.`,
      `There is breathing from inside the crib. Slow, deep, and patient.`,
      `You did not make this room. You recognize every object in it. These are not the same thing, and in this house they don't have to be.`,
    ],
    choices: [
      { text: 'Look inside the crib', next: 'the_crib' },
      { text: 'Wind up the mobile', next: 'the_mobile' },
      { text: 'Open the closet', next: 'the_closet' },
    ],
  },

  nursery_from_kitchen: {
    bg: 'bg-cold',
    paragraphs: [
      `You leave the kitchen.`,
      `A door is where a wall was. You don't question this. You've stopped questioning the architecture.`,
      `The nursery is the size of a country. The crib at the center with its impossible bars. The mobile turning: house, hands, eye. House, hands, eye.`,
      `You already knew you were going to end up in this room. Some part of you has been walking toward it since before you understood what walking was.`,
      `There is breathing from inside the crib.`,
    ],
    choices: [
      { text: 'Look inside the crib', next: 'the_crib' },
      { text: 'Wind up the mobile', next: 'the_mobile' },
    ],
  },

  nursery_from_cabinet: {
    bg: 'bg-cold',
    paragraphs: [
      `You come out from underneath the crib.`,
      `For a moment you are on your hands and knees on a cold floor looking up at the wooden slats above you, at the bars on either side extending upward. From here, from this angle, from this size, you understand something about this room that you couldn't have understood any other way. You have been in this crib. Not as the thing inside it. As the child who needed bars this high.`,
      `You stand. You are the right size for the room again, or close enough.`,
      `But you carry the memory of the other size now. You carry what it felt like to be small in a room built to keep you.`,
      `The breathing from inside the crib is coming from above you now.`,
    ],
    choices: [
      { text: 'Look inside the crib', next: 'the_crib' },
      { text: 'Get out of this room', next: 'mirror_approach' },
    ],
  },

  the_mobile: {
    bg: 'bg-cold',
    paragraphs: [
      `You wind the key on the mobile's underside.`,
      `It plays four notes. Then those four notes again. Then again. A loop small enough to fit inside a child's entire attention.`,
      `You know this melody.`,
      `Not by remembering it — by inhabiting it. It lives in the part of you that formed before language, before choice, before the self that makes choices. It was sung to you. It is the lullaby.`,
      `But — and this comes to you slowly, the way things come to you in this house, as fact rather than revelation — it wasn't written for you. You understand this now while the notes play. The song was written for something else. You happened to be nearby. You were the closest available recipient. The song was always going somewhere you couldn't follow.`,
      `The mobile slows and stops.`,
      `The eye-shaped piece is facing you.`,
      `The eye is facing you.`,
    ],
    choices: [
      { text: 'Look inside the crib', next: 'the_crib' },
      { text: 'Open the closet', next: 'the_closet' },
    ],
  },

  the_closet: {
    bg: 'bg-cold',
    paragraphs: [
      `The closet holds clothes.`,
      `Both sizes. Child's clothing and adult clothing, hanging on the same rod, sharing hangers, mingled as though whoever arranged them saw no difference or saw too much difference to bother separating them.`,
      `At the back of the closet, where the clothes hang thickest: a mirror.`,
      `You almost don't see it. Then you do.`,
      `The mirror shows you the nursery behind you. The crib. The mobile, still. The room as it is.`,
      `But in the mirror's version of the room, you are not there.`,
      `The crib is empty. The mobile is unmoving. The room is exactly as it would be if no one had ever come here, if no one had ever stood where you are standing.`,
      `You are looking at a room that has forgotten you, and the room looks fine.`,
    ],
    choices: [
      { text: 'Step into the mirror', next: 'ending_dissolution' },
      { text: 'Close the closet', next: 'nursery' },
    ],
  },

  // ---- THE CRIB ----
  the_crib: {
    bg: 'bg-cold',
    paragraphs: [
      `You look inside the crib.`,
      `There is a child.`,
      `It looks like you did, once — at the age where you were small enough that the world was mostly knees and countertops and things just out of reach. Or it looks like something you are becoming. You cannot tell which direction time is moving in this house, and after a while you stop expecting it to move the way it usually does.`,
      `It has your hands.`,
      `Not a child's hands. Your hands — your exact hands, every line, every small irregularity you know as well as your own name — attached to a child's arms. It takes a moment to register, the way an image registers when you are not looking at it directly.`,
      `It opens its eyes and looks up at you.`,
      `The way children look at parents: like you are the whole world. Like you are the reason the world was built. Like you are also, somewhere underneath all that, the thing that might end it.`,
    ],
    choices: [
      { text: 'Pick it up', next: 'holding' },
      { text: 'Don\'t touch it', next: 'leaving_crib' },
      { text: 'Speak its name', next: 'folk_path' },
    ],
  },

  leaving_crib: {
    bg: 'bg-cold',
    paragraphs: [
      `You don't touch it.`,
      `It doesn't touch you.`,
      `The moment extends. The mobile turns: house, hands, eye. The house breathes around you with the slow patience of something that has learned to be very still.`,
      `Then it begins to cry.`,
      `Not the way children cry for comfort. Not the kind of crying you can fix. The way they cry for something that no one has a word for — for the specific loss of things that haven't happened yet, for the door that isn't there, for the person who should be there and isn't, for every version of themselves they will never be allowed to be.`,
      `The sound fills the room. It fills you. It is the most honest sound you have heard in this house, and it is unbearable.`,
    ],
    choices: [
      { text: 'Pick it up', next: 'holding_late' },
      { text: 'Leave the room', next: 'mirror_approach' },
    ],
  },

  holding: {
    bg: 'bg-cold',
    paragraphs: [
      `You pick it up.`,
      `It is heavier than it should be. Not heavy like a child — heavy like a memory you have been carrying for so long you forgot it had weight. Like something you set down somewhere and kept walking and did not realize until right now that you have been leaning to compensate.`,
      `It presses its face against your neck and breathes. It smells like the earliest thing you can remember. Earlier than that. It smells like before you had language for smells.`,
      `"You forgot me," it says.`,
      `It doesn't say anything else. There isn't anything else to say. This is the whole sentence. This is the whole complaint. It waits in the air between you like a thing that has been hanging there for years, patient, waiting for someone to hear it.`,
      `You understand that you are not the first person to stand in this room holding this specific weight. You will not be the last — unless something changes. Unless you do something different than every person before you.`,
    ],
    choices: [
      { text: 'I remember now', next: 'memory_path' },
      { text: 'I\'m sorry', next: 'cycle_path' },
      { text: 'I don\'t know what you are', next: 'confusion_path' },
    ],
  },

  holding_late: {
    bg: 'bg-cold',
    paragraphs: [
      `You pick it up.`,
      `It stops crying the instant you do — not gradually, not winding down, but immediately, like a switch. Like it knew exactly when you would come back. Like it has been through this before and knows how it goes.`,
      `It presses its face against your shoulder. It holds tighter than a child should be able to hold.`,
      `"I knew you would," it says.`,
      `You don't say you almost didn't. You almost didn't.`,
      `"You always do, eventually," it says. "That's just what this is."`,
      `The weight of it settles into you — not comfortable, not comfortable at all, but specific. The weight of exactly this, of exactly what happened here, of exactly who you are and who made you that way and who you have been making in turn.`,
    ],
    choices: [
      { text: 'I remember now', next: 'memory_path' },
      { text: 'I\'m sorry', next: 'cycle_path' },
    ],
  },

  confusion_path: {
    bg: 'bg-cold',
    paragraphs: [
      `"I don't know what you are," you say.`,
      `It pulls back and looks at you. Its hands — your hands — rest against your face.`,
      `"You made me," it says. "Or you were me. We keep forgetting which is which."`,
      `It gestures at the room — the crib, the mobile, the drawings you've been seeing on every wall since you arrived here.`,
      `"We drew those," it says. "Both of us. Together. That's what you keep forgetting — that it was both of us."`,
      `You look at the drawings. Houses. Hands. Suns with too many rays. They are in your handwriting. They are also in a child's handwriting. You look back and forth between them and finally understand that they are the same handwriting. They have always been the same handwriting. The same person wrote them from different heights.`,
      `"Do you remember now?" it asks.`,
    ],
    choices: [
      { text: 'Yes. I remember now.', next: 'memory_path' },
      { text: 'Let go of it', next: 'mirror_approach' },
    ],
  },

  // ---- FOLK PATH ----
  folk_path: {
    bg: 'bg-cold',
    paragraphs: [
      `You speak its name.`,
      `You didn't know you knew it. The name arrived in your mouth from somewhere below language — from a room deeper than memory, from whatever place in you was formed before you were formed. You understand, as you say it, that this is what you have been saying under your breath for years. What you have been saying in your sleep. The name you weren't supposed to say aloud because saying it correctly calls something.`,
      `The child's eyes open wider.`,
      `From somewhere in the walls — from the structure of the house itself — an answering sound. Something very old responding to the correct frequency after a long wait. The mobile begins to turn without being wound.`,
      `"Finally," the child says. It is not speaking in a child's voice. "We've been waiting for you to remember how to say it."`,
      `The room shifts. The shadows in the corners thicken and move like breathing. Something is behind the walls, listening through the plaster with the patience of things that have been there since the house was built.`,
      `"You don't have to do anything complicated," the child says. "Just come with me. Just come down."`,
    ],
    choices: [
      { text: 'Go with it', next: 'folk_deeper' },
      { text: 'Run', next: 'mirror_approach' },
    ],
  },

  folk_deeper: {
    bg: 'bg-deep',
    paragraphs: [
      `It takes you by the hand.`,
      `Your hand. Holding your hand.`,
      `It leads you to a door in the nursery floor that you did not see before and would not have found without being led here. The door opens onto stairs going down — wooden, old, the kind of stairs that exist in the oldest part of a house, the part that was there before the rest was built around it.`,
      `Below: not a basement. Something older than a basement. The smell of deep earth, old wood, something that has been kept in the dark for a long time and has adjusted.`,
      `"This is where the house keeps itself," the child says. "The part it doesn't show most people."`,
      `You descend. With each step down, the house gets quieter above you and louder below — not louder in sound but louder in feeling. More present. More itself.`,
      `"You can sit here," the child says. "You don't have to do anything. That's the whole offer. Just be here. Some of us just needed someone to sit with."`,
    ],
    choices: [
      { text: 'Go deeper into the house', next: 'basement' },
      { text: 'Sit down here, on these stairs', next: 'ending_silence' },
    ],
  },

  basement: {
    bg: 'bg-deep',
    paragraphs: [
      `The stairs end in a room that has no right angles.`,
      `The walls curve in ways that walls don't curve. The floor is uneven in a way that soil is uneven — it is, in fact, soil. You are standing on the actual ground, the ground under the house, the ground the house was built on and has never stopped being in contact with.`,
      `Roots come through the ceiling. Through the walls. They are everywhere — thick and old, pale from years without light, hanging down in clusters or growing along the walls in flat sweeping patterns like the drawings in the hallway. The roots look like hands. Or the roots have grown through where hands were, and taken on their shape. It is impossible to tell.`,
      `The child stands beside you. In the basement it looks different — older and younger at once, more itself, less concerned with being legible to you.`,
      `"It doesn't want to hurt anyone," the child says. "It just doesn't know what else to do with what it loves."`,
      `A root near your hand moves. Not toward you. Just... settles.`,
      `"It keeps things. That's all it knows how to do."`,
    ],
    choices: [
      { text: 'Go deeper, into the root-space', next: 'basement_deeper' },
      { text: 'Sit down among the roots', next: 'ending_silence' },
    ],
  },

  basement_deeper: {
    bg: 'bg-deep',
    paragraphs: [
      `You push through the roots.`,
      `They part, slowly, with the deliberate movement of things that are very strong and choosing not to use it. You move deeper into the room, which has no back wall that you can see, which extends further than the house above it, which extends possibly as far as the garden extends.`,
      `You find the center.`,
      `Or what feels like a center. A space where the roots have grown to form something almost like a room, almost like a seat, almost like a place that was designed for someone to rest in. Something is in it. Something that has been here since before the house. The house grew up around it, over centuries, around this specific thing — and the thing noticed, and welcomed this, and asked for more.`,
      `It is not asleep. It has never slept. It is very, very patient.`,
      `It knows your name. Not the name on the growth marks. The name under that. The name that the house has been saying to you since you arrived, at frequencies you couldn't hear but your body could.`,
      `"Hello," it says, in a voice that is not a voice.`,
      `It does not sound like a monster. It sounds like the oldest thing you have ever been loved by.`,
    ],
    choices: [
      { text: 'Stay', next: 'ending_silence' },
      { text: 'Go back up', next: 'folk_deeper' },
    ],
  },

  // ---- MEMORY PATH ----
  memory_path: {
    bg: 'bg-cold',
    paragraphs: [
      `You remember.`,
      `Not gradually. All at once, the way something falls: the full weight of it arriving before you can brace.`,
      `You remember the hallway before it was narrow. You remember being the right size for it — being small in it, then less small, then the exact right size, then starting to feel too large. You remember the kitchen when the counters were impossibly high and the growth marks were something to be proud of, something to look forward to.`,
      `You remember the nursery when the crib was yours.`,
      `And you remember what came after. The long, slow wrongness. The way the house held on even after you grew. The way pieces of you stayed behind when you tried to leave — not metaphorically, but actually, in ways you couldn't name but felt as gaps in yourself you spent years trying to fill with other things. You remember what was done in this house and what you learned in this house and what you went out and did with what you learned.`,
      `Both. You remember both.`,
      `The child in your arms goes very still.`,
      `"That's it," it says quietly. "That's the whole thing. You're not supposed to be able to hold all of that at once."`,
      `"I know," you say.`,
      `The house does something you didn't know it could do. It flinches.`,
    ],
    choices: [
      { text: 'Keep remembering', next: 'memory_attic' },
    ],
  },

  memory_attic: {
    bg: 'bg-cold',
    paragraphs: [
      `There is a staircase you haven't used. It goes up.`,
      `The child points to it. You didn't notice it before, but that's true of everything in this house — things exist when they're needed.`,
      `You carry it up the stairs. Each step the memories sharpen, become more specific: not just the fact of what happened here but the details. The sound of particular voices. The temperature of particular rooms. The specific texture of how love and harm can be so deeply mixed that a child cannot tell them apart and will spend the rest of their life being confused by both.`,
      `The attic is full of things that were stored here to be forgotten. Furniture under sheets. Boxes without labels. Photographs turned face-down.`,
      `In the center of the attic: a window.`,
      `Through the window: outside. The actual outside — not the garden, not another room dressed up as outside. Outside.`,
      `The child looks at the window and then looks at you.`,
      `"You'd have to put me down," it says.`,
      `"I know," you say.`,
      `"I don't want you to," it says.`,
      `"I know," you say.`,
    ],
    choices: [
      { text: 'Put it down gently and go to the window', next: 'ending_memory' },
    ],
  },

  // ---- CYCLE PATH ----
  cycle_path: {
    bg: 'bg-cold',
    paragraphs: [
      `"I'm sorry," you say.`,
      `The child buries its face in your shoulder. You feel the weight of it settle — not lighter, not lighter at all, but differently distributed, as if your body has finally found the shape it was trying to reach.`,
      `"I know," it says. "You always are."`,
      `You stand in the nursery. The mobile turns. The house breathes slowly around you, a rhythm like something that has been holding its breath for years and has finally been allowed to exhale.`,
      `You are very tired. You didn't know how tired until now, until something acknowledged it. You have been walking a long time. You have been walking toward this room longer than you've been alive and you didn't know it.`,
      `A staircase appears that wasn't there before. Or was there and you weren't ready to see it. It goes up. The wallpaper on the stairs shows a pattern you recognize: the same houses, the same hands. All the drawings you made from all your different heights.`,
      `You understand that there is a room at the top of these stairs. That it has always had your shape. That it has been ready for you the entire time.`,
    ],
    choices: [
      { text: 'Go upstairs', next: 'cycle_upstairs' },
    ],
  },

  cycle_upstairs: {
    bg: 'bg-cold',
    paragraphs: [
      `You carry it up the stairs.`,
      `The room at the top is small and warm. The smell of it is specific: wood and old fabric and the particular warmth of a room that has been waiting for an occupant. There is a chair. There is a window. There is a crib — smaller than the one downstairs, older, the kind made by hand.`,
      `The room has been here the whole time. The house kept it ready.`,
      `You lay the child in the smaller crib. It looks up at you with your eyes. It is very quiet.`,
      `"You'll forget again," it says. Not accusing. Reporting. The tone of something that has learned to accept what is true.`,
      `"I know," you say.`,
      `"That's okay," it says. "We'll do it again. We always do."`,
      `You sit in the chair. The chair fits you. You didn't expect it to fit you so well. The window shows the garden below — the shapes in the beds, patient, waiting, content.`,
      `Downstairs, the front door opens.`,
      `Small footsteps in the hallway. Slow, hesitant, the feet of something trying to figure out the rules of a new place. The wallpaper covered in drawings. The birthday smell from the kitchen. The sound from the nursery.`,
      `Someone new is reading the drawings.`,
      `You close your eyes.`,
      `You are home.`,
    ],
    choices: [
      { text: 'Continue', next: 'ending_cycle' },
    ],
  },

  // ---- SECRET: STUDY ----
  study: {
    bg: 'bg-mirror',
    paragraphs: [
      `The study is not a room you've found before.`,
      `But you have been here before — you understand this the moment you step through the door. You've been here in a way that preceded finding it, the way you know the shape of a house you lived in as a child even when you can't remember the floor plan.`,
      `Bookshelves on every wall. A desk. On the desk: journals, stacked, the kind with marbled covers, the kind that implies something important was being documented.`,
      `And a pen, set down in the middle of a sentence that was never finished.`,
      `Someone was writing when they were interrupted. Or when they ran out of something — out of words, or out of time, or out of the specific energy it takes to keep writing when you already know how the story ends.`,
      `You sit down at the desk.`,
      `The journals are all here. All of them. The whole record.`,
    ],
    choices: [
      { text: 'Read the journals', next: 'study_journals' },
      { text: 'Look at the unfinished sentence', next: 'study_writing' },
    ],
  },

  study_journals: {
    bg: 'bg-mirror',
    paragraphs: [
      `You read.`,
      `The journals span years. The handwriting changes — confident to hesitant to urgent to small. The subject is the house. This house. There are floor plans, measurements, notes on the behavior of the rooms. Notes on what the house keeps. Notes on what it wants and how it asks for it and what it does when it doesn't get it.`,
      `You find your name.`,
      `Not as a person in the journals. As a character in them. As a specific slot in the pattern — the one who would arrive after this many others, would take this path through the house, would hold the child, would make these exact choices. You read about yourself from the outside.`,
      `You read about the endings. All of them. Carefully described, carefully considered, written down by someone who built this place and then realized, too late, what they had built, and could not stop it and could not leave it and so stayed here and documented it for whoever came next.`,
      `The last entry reads: *I can't get out. I've tried the endings. They all close. There's one I haven't tried. The one where someone sits down and writes a different one. I don't know if it works. I've never been able to make myself try. I'm leaving this for you. If you're reading this, you've been here before. You know enough. Try it. Write the ending I couldn't.*`,
    ],
    choices: [
      { text: 'Go to the unfinished sentence', next: 'study_writing' },
    ],
  },

  study_writing: {
    bg: 'bg-mirror',
    paragraphs: [
      `You look at the unfinished sentence.`,
      `It reads, in small careful writing: *And then—*`,
      `The pen is there.`,
      `You understand what is being asked. Not by the house — the house doesn't want this. By the journals. By the person who filled them. By whoever built this place with the intention of something and then watched it become something else and spent their remaining time trying to leave a way out for whoever came after.`,
      `You pick up the pen.`,
      `It is heavy, the way pens are heavy when they have been used for something serious for a long time. The nib is still wet. The ink is still fresh. Someone was here very recently, or the house keeps it ready, or time in the study works differently than in the rest of the rooms.`,
      `You look at the paper. You look at the two words.`,
      `*And then—*`,
      `You could write anything. That's the terrifying part. You have read all the journals. You know what this place is, what it does, what it wants, what it fears. You know that no one has ever sat in this chair and written a different sentence. You know that the person who asked you to do it couldn't do it themselves.`,
      `The pen touches the paper.`,
    ],
    choices: [
      { text: 'Write: "—they left."', next: 'ending_author' },
    ],
  },

};

// =========================================
// ENDINGS DATA
// =========================================

const ENDINGS = {

  ending_garden: {
    title: 'THE GARDEN',
    epitaph: 'The house always had room for one more.',
    bg: 'bg-garden',
    paragraphs: [
      `You don't run.`,
      `You tell yourself you're just resting. That you'll get up in a moment. That the warm earth and the specific fit of this hollow are temporary comforts, not decisions.`,
      `The moment extends. Another comes. More follow.`,
      `The earth curves gently up around you — not sealing, not trapping, just completing a shape that was already there. The shape of you, pressed into the ground, which has been waiting for you to fill it.`,
      `Something in the garden exhales. The whole garden. A long, slow exhalation of something that has been held.`,
      `"We knew you'd be back," says the voice. It sounds relieved.`,
      `Above you the sky moves through its changes. Weather comes and goes. The seasons of the garden proceed around you — slow, vegetable, patient. You feel yourself entering the rhythm of it. The long, unhurried rhythm of things that are rooted.`,
      `You stop needing to know how long you've been here.`,
      `In the spring, something will grow from you. This is not a metaphor. In this garden, things that are planted grow, and nothing is wasted, and everything the house keeps eventually becomes something new.`,
      `You were kept here once before. You just didn't know where the garden was.`,
    ],
  },

  ending_gate: {
    title: 'THE GATE',
    epitaph: 'You were the first to leave it hungry.',
    bg: 'bg-garden',
    paragraphs: [
      `You walk until the house is not even a light behind you.`,
      `The field opens out in every direction. The air is cold and direct and full of nothing in particular. You breathe it and keep walking and after a while you find a road, and after a while a road finds a town, and the town has the things towns have: light, noise, people who don't know you and don't need to.`,
      `You are fine.`,
      `This is the accurate word for what you are. Not healed. Not whole. Not fixed. Fine, which is its own thing — the particular fineness of someone who got out of something and is still getting used to the size of the world now that they have room in it.`,
      `There will be nights. There will be the specific kind of night that this kind of thing produces. You know about those nights already. You've been having them.`,
      `But you're out.`,
      `The house is behind you, past the gate, past the garden. And in the garden, the beds are full, and in the kitchen something stays warm, and in the nursery the mobile turns.`,
      `And the house, for the first time in longer than it can count, is waiting for someone who is not coming back.`,
      `You did that.`,
      `You're allowed to feel something about that.`,
    ],
  },

  ending_hungry: {
    title: 'THE HUNGRY',
    epitaph: 'The house fed you. Now you feed.',
    bg: 'bg-warm',
    paragraphs: [
      `You reach into the pot.`,
      `The liquid is warm. The face that is yours and isn't yours rises to meet your hand. Your fingers find its fingers under the surface. It closes them — gently, the way you close a hand around something you've been looking for.`,
      `It does not resist.`,
      `You pull.`,
      `What comes out is not a face. It is everything. Every year. Every piece that stayed here when you left or left here when you stayed — every version of yourself this house ever held that you didn't take back with you. It is dense and heavy and warm and it presses itself against your chest and folds in, and for a moment you feel absolutely complete.`,
      `More whole than you have been since before you can remember.`,
      `Full.`,
      `You walk out the front door. The house makes no sound.`,
      `Outside: a normal morning. Sun. Ordinary distance. The smell of someone else's breakfast.`,
      `You sit on the curb and you feel the thing inside you move. It is warm. It is satisfied. It is yours now, and it is going to get hungry again, and you already know what it wants.`,
      `You already know where to find more.`,
    ],
  },

  ending_escape: {
    title: 'ESCAPE (CORRUPTED)',
    epitaph: 'You carried the door with you.',
    bg: 'bg-mirror',
    paragraphs: [
      `You break the mirror.`,
      `It fractures quietly — too quietly, no crash, just a soft separation like something that was barely holding together finally letting go. The pieces fall without shattering. They lie on the floor, each showing a different version of the room.`,
      `You pick up the largest shard. It is not sharp the way glass is sharp. It is sharp the way a specific memory is sharp — the kind that cuts when you weren't planning to touch it.`,
      `You press it against the wall and draw a line. The wall opens. Not dramatically — it folds back, obediently, the way things do in this house when you finally do what they were waiting for you to do.`,
      `Beyond: a hallway. Then a door. Then outside.`,
      `You walk through. The house doesn't stop you. The door closes behind you.`,
      `You stand in the ordinary world. Daylight. Distance. Space.`,
      `You feel like yourself. You feel better than you have in a long time.`,
      `You take out your phone. You want to hear a familiar voice. The call connects. They answer.`,
      `"You should come visit," you say. "I have a place I'd love to show you."`,
      `You didn't plan to say that. But it feels right. It feels warm. It feels like the specific warmth of sharing something you love with someone you love.`,
      `You give them the address.`,
      `It is the address you just left.`,
    ],
  },

  ending_dissolution: {
    title: 'DISSOLUTION',
    epitaph: 'You were always the decoration.',
    bg: 'bg-mirror',
    paragraphs: [
      `You step through the mirror.`,
      `Or into it. The distinction stops mattering almost immediately.`,
      `On the other side: the same room. The same nursery, or the same hallway — you can't quite tell which, and the room seems uncertain as well. The same shapes, the same distances. But the distances are different. The walls are further away. Getting further.`,
      `You reach for the nearest surface and your arm extends wrong — too far, at the wrong angle, like a limb in a dream that keeps arriving too late.`,
      `You look at your hands.`,
      `They are becoming lines. Not disappearing — becoming. The kind of lines you draw with a pencil when you draw a person. Simple strokes. Slightly uncertain. The lines are moving in from your fingertips and as they go they take the weight with them and leave something lighter behind.`,
      `This is not painful.`,
      `This is like being remembered incorrectly by someone who loved you very much.`,
      `By morning, there will be new drawings on the wallpaper in the hallway. A figure. Houses. Stick figures holding hands. The figure will be the right size. The figure will be you, approximately, from the angle that someone would draw you if they had learned what you looked like by heart and were drawing from that.`,
      `The house found room for you after all.`,
      `It always had room for you. It just took this long to decide what you were best used for.`,
    ],
  },

  ending_memory: {
    title: 'THE MEMORY',
    epitaph: 'You could not leave. But you could not be kept.',
    bg: 'bg-cold',
    paragraphs: [
      `You set it down gently.`,
      `It watches you go to the window without stopping you. It understands what's happening — maybe better than you do. Maybe it's been waiting for this version of the event.`,
      `You open the window.`,
      `And you keep remembering. You don't stop. You hold every year, every specific thing, every detail you spent the rest of your life trying not to know. You hold it all at once, which is supposed to be impossible, which should break something in you — and maybe it does, but if it breaks something it breaks the right thing.`,
      `The house shakes. Quietly. The way a person shakes when they're told something true they were hoping wasn't.`,
      `The walls breathe in and don't breathe out again.`,
      `The growth marks on the kitchen wall begin to fade. Not erasing — completing. They reach the top of the wall and curve across the ceiling and they are done. No more measuring. Whatever was being tracked is finished.`,
      `You don't leave through the window. You were never going to leave through the window. But you stand in it for a long time while the house does something that houses are not supposed to be able to do.`,
      `And then you're not there. And the room is not empty — it is full of the shape you held, full of everything you remembered, the exact impression of someone who knew exactly what happened here and chose to hold it anyway.`,
      `They say houses remember their occupants. They have it backwards.`,
      `Occupants remember the house.`,
      `And now the house has to live with being remembered this specifically, this completely, by someone it could not make forget.`,
      `The house is haunted now.`,
      `By something it could not hold.`,
    ],
  },

  ending_cycle: {
    title: 'THE CYCLE',
    epitaph: 'The door was always open. Something always walks through.',
    bg: 'bg-cold',
    paragraphs: [
      `You sit in the chair.`,
      `The chair receives you the way a thing receives what it was made for. The room breathes. The mobile in the nursery below has stopped. The house around you settles — all its rooms, all its impossible distances, all its kept things — into the specific kind of stillness that is not emptiness but completion.`,
      `The child in the crib looks up at you.`,
      `"You'll forget," it says again, softly. Not to warn you. Not to accuse you. Just true.`,
      `"I know," you say.`,
      `"That's okay," it says. "That's how it works."`,
      `The chair is very comfortable. You don't want to stand up. You don't think you're going to. The window shows the garden and the garden is where it belongs and everything is where it belongs and you are where you belong.`,
      `Downstairs: the front door opens. The sound of it carries easily in this house, which amplifies the things it wants you to hear.`,
      `Small footsteps in the hallway below. Careful and slow, the feet of something reading the wallpaper. The birthday smell from the kitchen. The sound, from this room above, of breathing.`,
      `Something new is reading the drawings.`,
      `You close your eyes.`,
      `You remember being where they are. You remember the hallway, the wallpaper, the two directions you were given. You remember choosing. You remember everything you found and everything that found you.`,
      `You remember forgetting.`,
      `And you close your eyes, and the house breathes around you, and the footsteps come slowly up the stairs.`,
    ],
  },

  ending_silence: {
    title: 'THE SILENCE',
    epitaph: 'Some things don\'t end. They just become the weather.',
    bg: 'bg-deep',
    type: 'silence',
    silenceLines: [
      `The house has been waiting for 47 years.`,
      `It will wait longer.`,
      `You don't have to do anything.`,
      `That's the whole point.`,
    ],
    paragraphs: [
      `You sit down.`,
      `The child — or what brought you here — settles beside you, close. Its borrowed hands folded in its lap with the patience of something that stopped expecting resolution a long time ago.`,
      `The house goes very still.`,
      `Not the held-breath stillness of before. The other kind. The stillness of something that has stopped performing stillness and just become it. The mobile doesn't move. The roots don't shift. The pot doesn't boil. Everything that was happening is not happening.`,
      `You wait for something to occur.`,
      `Nothing does.`,
      `You remain. The house remains. The thing beside you remains. The breath between you is the only event and it is enough — it has to be enough — it is what there is.`,
    ],
  },

  ending_author: {
    title: 'THE AUTHOR',
    epitaph: 'You finished it. You don\'t know what you left behind.',
    bg: 'bg-mirror',
    paragraphs: [
      `You write: *—they left.*`,
      `You put the pen down.`,
      `For a moment: nothing.`,
      `Then: something changes in the house below. You feel it through the floor — a pressure releasing, a long-held thing finally doing what it was going to do eventually anyway. Not violent. Just done.`,
      `The study door opens.`,
      `Beyond it: stairs you've seen before, but they lead somewhere different now. Down, past the kitchen, past the nursery, past the basement, past whatever is below the basement. Or perhaps just to the front door. It's hard to tell and you find you don't need to know. Your feet know.`,
      `You walk out.`,
      `You don't look back. This isn't bravery — looking back doesn't appeal to you, not because the house is threatening but because you have already written the ending. Looking back would be revision, and you've decided not to revise.`,
      `Outside: morning. Not the specific morning of the garden, not the moonlit wrongness of the garden beds. A different morning. The kind that exists independent of this house, the kind that would be here whether the house was here or not.`,
      `You walk away from it.`,
      `You have no way of knowing if it worked. You don't know if the person in the journals is free, or what free would mean for them, or whether writing two words at a desk is enough to undo years of architecture. You don't know what you left behind in that room. You don't know what the house will do with the sentence you finished.`,
      `You know you finished it.`,
      `You know it ended.`,
      `You are outside, and it is morning, and you are going to go find out what happens next.`,
    ],
  },

};

// =========================================
// ENGINE
// =========================================

const contentEl = document.getElementById('content');
const trackerEl = document.getElementById('tracker');
const skipHintEl = document.getElementById('skip-hint');

let isTyping = false;
let cancelTyping = null;

function charDelay(c) {
  if (c === '.' || c === '?' || c === '!') return 260;
  if (c === ',') return 95;
  if (c === ';' || c === ':') return 130;
  if (c === '—') return 140;
  if (c === '\n') return 200;
  return 18;
}

function typeText(paragraphs, container, onDone) {
  isTyping = true;
  skipHintEl.classList.add('visible');
  let cancelled = false;
  let tid = null;

  cancelTyping = () => {
    cancelled = true;
    if (tid) clearTimeout(tid);
    container.innerHTML = '';
    paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.innerHTML = text.replace(/\n/g, '<br>');
      container.appendChild(p);
    });
    isTyping = false;
    skipHintEl.classList.remove('visible');
    cancelTyping = null;
    onDone();
  };

  let pi = 0;

  function nextParagraph() {
    if (cancelled) return;
    if (pi >= paragraphs.length) {
      isTyping = false;
      skipHintEl.classList.remove('visible');
      cancelTyping = null;
      onDone();
      return;
    }
    const p = document.createElement('p');
    container.appendChild(p);
    typeChars(p, paragraphs[pi], 0);
  }

  function typeChars(p, text, ci) {
    if (cancelled) return;
    if (ci < text.length) {
      const c = text[ci];
      if (c === '\n') {
        p.appendChild(document.createElement('br'));
      } else {
        p.appendChild(document.createTextNode(c));
      }
      tid = setTimeout(() => typeChars(p, text, ci + 1), charDelay(c));
    } else {
      pi++;
      tid = setTimeout(nextParagraph, pi < paragraphs.length ? 390 : 0);
    }
  }

  nextParagraph();
}

function showChoices(choices, container) {
  const div = document.createElement('div');
  div.className = 'choices';
  container.appendChild(div);

  choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch.text;

    const isLocked = ch.condition && !ch.condition();
    if (isLocked) {
      btn.classList.add('locked');
      btn.disabled = true;
    } else {
      btn.addEventListener('click', () => gotoScene(ch.next));
    }

    div.appendChild(btn);
    setTimeout(() => btn.classList.add('visible'), 60 * i + 80);
  });
}

function setBg(cls) {
  document.body.className = cls || '';
}

function gotoScene(sceneId) {
  contentEl.classList.add('fading');
  if (isTyping && cancelTyping) {
    cancelTyping();
    isTyping = false;
  }
  setTimeout(() => {
    contentEl.classList.remove('fading');
    renderScene(sceneId);
  }, 560);
}

function renderTitle() {
  setBg('');
  const w = document.createElement('div');
  w.className = 'title-wrap';

  const h1 = document.createElement('h1');
  h1.className = 'title-name';
  h1.textContent = 'Still Hollow';
  w.appendChild(h1);

  const sub = document.createElement('p');
  sub.className = 'title-sub';
  sub.textContent = 'What the house keeps, the house becomes.';
  w.appendChild(sub);

  if (foundEndings.size > 0) {
    const gallery = document.createElement('div');
    gallery.className = 'title-gallery';

    const label = document.createElement('p');
    label.className = 'gallery-label';
    label.textContent = `${foundEndings.size} / ${Object.keys(ENDINGS).length} endings found`;
    gallery.appendChild(label);

    const list = document.createElement('div');
    list.className = 'gallery-endings';

    Object.keys(ENDINGS).forEach(id => {
      const item = document.createElement('span');
      item.className = 'gallery-item';
      if (id === 'ending_author') item.classList.add('secret');
      if (foundEndings.has(id)) {
        item.classList.add('found');
        item.textContent = ENDINGS[id].title;
      } else {
        item.textContent = id === 'ending_author' ? '???' : '???';
      }
      list.appendChild(item);
    });

    gallery.appendChild(list);
    w.appendChild(gallery);
  }

  const btn = document.createElement('button');
  btn.className = 'title-begin';
  btn.textContent = foundEndings.size > 0 ? 'Continue' : 'Begin';
  btn.addEventListener('click', () => gotoScene('corridor'));
  w.appendChild(btn);

  contentEl.appendChild(w);
}

function renderPlay(sceneId, scene) {
  setBg(scene.bg || '');

  const textDiv = document.createElement('div');
  textDiv.className = 'scene-text';
  contentEl.appendChild(textDiv);

  typeText(scene.paragraphs, textDiv, () => {
    showChoices(scene.choices, contentEl);
  });
}

function renderSilence(sceneId, ending) {
  setBg(ending.bg || 'bg-deep');
  markEnding(sceneId);

  const wrap = document.createElement('div');
  wrap.className = 'ending-wrap';

  const body = document.createElement('div');
  body.className = 'ending-body';
  wrap.appendChild(body);
  contentEl.appendChild(wrap);

  typeText(ending.paragraphs, body, () => {
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    body.appendChild(cursor);

    const delays = [8000, 5000, 5000, 5000];
    const lines = ending.silenceLines;

    function showNext(i) {
      if (i >= lines.length) {
        cursor.remove();
        renderEndingFooter(wrap, sceneId, ending);
        return;
      }
      setTimeout(() => {
        const p = document.createElement('p');
        p.className = 'silence-line';
        p.textContent = lines[i];
        body.insertBefore(p, cursor);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => p.classList.add('visible'));
        });
        showNext(i + 1);
      }, delays[i] || 5000);
    }

    showNext(0);
  });
}

function renderEndingFooter(wrap, sceneId, ending) {
  const nameEl = document.createElement('h2');
  nameEl.className = 'ending-name';
  nameEl.textContent = ending.title;
  wrap.appendChild(nameEl);

  const epitaph = document.createElement('p');
  epitaph.className = 'ending-epitaph';
  epitaph.textContent = ending.epitaph;
  wrap.appendChild(epitaph);

  const linkWrap = document.createElement('div');
  linkWrap.className = 'ending-choices';

  const again = document.createElement('button');
  again.className = 'ending-link';
  again.textContent = 'Play again';
  again.addEventListener('click', () => gotoScene('title'));
  linkWrap.appendChild(again);

  const replay = document.createElement('button');
  replay.className = 'ending-link';
  replay.textContent = 'Return to the corridor';
  replay.addEventListener('click', () => gotoScene('corridor'));
  linkWrap.appendChild(replay);

  wrap.appendChild(linkWrap);
  updateTracker();
}

function renderEnding(sceneId, ending) {
  if (ending.type === 'silence') {
    renderSilence(sceneId, ending);
    return;
  }

  setBg(ending.bg || 'bg-ending');
  markEnding(sceneId);

  const wrap = document.createElement('div');
  wrap.className = 'ending-wrap';

  const body = document.createElement('div');
  body.className = 'ending-body';
  wrap.appendChild(body);
  contentEl.appendChild(wrap);

  typeText(ending.paragraphs, body, () => {
    renderEndingFooter(wrap, sceneId, ending);
  });
}

function renderScene(sceneId) {
  contentEl.innerHTML = '';
  window.scrollTo(0, 0);

  if (sceneId === 'title') {
    renderTitle();
    return;
  }

  if (ENDINGS[sceneId]) {
    renderEnding(sceneId, ENDINGS[sceneId]);
    return;
  }

  const scene = SCENES[sceneId];
  if (!scene) {
    contentEl.textContent = `[missing scene: ${sceneId}]`;
    return;
  }

  renderPlay(sceneId, scene);
}

function markEnding(id) {
  if (!foundEndings.has(id)) {
    foundEndings.add(id);
    playCount++;
    writeSave({ foundEndings: [...foundEndings], playCount });
    updateTracker();
  }
}

function updateTracker() {
  if (foundEndings.size === 0) {
    trackerEl.textContent = '';
    return;
  }
  trackerEl.textContent = `${foundEndings.size} / ${Object.keys(ENDINGS).length}`;
}

// =========================================
// INIT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  updateTracker();
  renderScene('title');

  document.addEventListener('click', e => {
    if (e.target.classList.contains('choice-btn')) return;
    if (e.target.classList.contains('ending-link')) return;
    if (e.target.classList.contains('title-begin')) return;
    if (isTyping && cancelTyping) cancelTyping();
  });
});
