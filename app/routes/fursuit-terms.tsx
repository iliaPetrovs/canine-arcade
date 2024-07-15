import Section from '~/components/Section';
import BubbleTitle from '~/subcomponents/BubbleTitle/BubbleTitle';
import Text from '~/subcomponents/Text/Text';

const content = (
  <div className="m-t-5">
    <BubbleTitle stretch small title="Process" />
    <div className="text-copy">
      Once I’ve approved your character and agreed to take your commission,
      you’ll be added to the queue on my public trello. When added to my queue,
      I’ll give you a rough estimate for when I anticipate starting work on your
      suit. Once I get to this stage, I will take the first payment and work
      with you to organise fur options, discuss shape preferences etc and just
      make sure we both understand exactly how we want the suit to come out.
      From here, I’ll need your head measurements, and if you’re getting a full
      suit, your DTD too. When the build process starts, I’ll keep you in the
      loop at every stage for input and send you WIPs of the suit to make sure
      you’re happy with each element. Once the suit is completed, we will
      arrange between us how to get the suit to you - whether that’s collection
      or shipping etc.{' '}
    </div>
    <BubbleTitle stretch small title="Payment and refunds" />
    <div className="text-copy">
      Payment for your suit is not required until I get to your slot. At this
      stage, I’ll ask for 50% upfront, with the second 50% required upon suit
      completion. If you fail to pay for the second half of the suit, I will
      sell the suit to cover costs and the first 50% will not be refunded to
      you. If you are struggling financially or an emergency has occurred,
      please reach out to me and we can arrange alternatives such as payment
      plans etc. I will only resort to selling your suit if you fail to pay for
      it, delays etc are negotiable. <br /> <br />
      If you wish to pay a deposit before I reach your spot in the queue to
      secure your slot and quote, I am happy to take a £500 refundable deposit
      which will come off of the total suit cost. This is not necessary however,
      if you’d prefer to just pay the initial 50% when I get to your slot that’s
      completely fine too. <br /> <br />
      The initial 50% will be refundable up until the point where I have started
      purchasing materials - once I’ve begun that process, the entire suit cost
      will be non refundable. Whilst unlikely, if I have to cancel the
      commission, I will refund you the amount paid in full. <br /> <br />
      Payments must be made via bank transfer. Whilst 50% upfront is preferred -
      I am happy to discuss payment plans to work around what works for you. I
      will not ship any suit parts until full payment is complete.{' '}
    </div>
    <BubbleTitle stretch small title="Deadlines and time estimates " />
    <div className="text-copy">
      I pay an immense amount of attention to each aspect of the suits I make,
      and therefore spend a very long time working on each costume. I will
      always redo parts until I deem them perfect - because of this I am not
      comfortable working with deadlines. <br /> <br />I am happy to give
      estimates but please understand that these are never set in stone - I have
      (medicated) ADHD and my suit building is very passion fuelled, with forced
      deadlines and timelines, I am likely to have a harder time getting things
      right and will become more stressed than necessary. <br /> <br />
      Please understand that I will also not work with rush fees because of
      this. I will never compromise on quality, so by commissioning me you
      should understand that whilst I will always do my best to work as fast as
      possible, there’s no predicting just how long some parts can take.
    </div>
    <BubbleTitle stretch small title="Communication" />
    <div className="text-copy">
      I work on one suit at a time, and prefer to involve clients at every step
      of the process (even the ugly stage!). Whilst I prefer Telegram as the
      main communication format with clients, I can also work with Twitter or
      Instagram if you aren’t able to access Telegram. <br /> <br />I work very
      closely with clients at every stage of the commission, from fur selection
      to finishing touches, sending WIPs at each stage and asking for input on
      things throughout the process.
    </div>
    <BubbleTitle stretch small title="Delivery and collection " />
    <div className="text-copy">
      I’m based in the UK in west London - when it comes to your suit being
      completed, you have three options.{' '}
      <ul>
        <li>
          collection at London furs (or confuzzled if the timeline lines up)
        </li>
        <li>travel to me and collect the suit directly</li>
        <li>
          get the suit shipped to your address - it’s the clients responsibility
          to cover shipping costs and I would always recommend the most priority
          option available to avoid the suit being lost in the post.
        </li>
      </ul>
      I am able to ship anywhere in the world, but please ensure that you’re
      happy with the cost of international shipping before commissioning me if
      you’re outside of the UK. If shipping internationally, declaring the full
      price of your suit is highly encouraged.
    </div>
    <BubbleTitle stretch small title="Add-ons and changes" />
    <div className="text-copy">
      Once a character design is approved, you are unable to change the
      character without discussing it with me first. This will be dependent on
      the situation (e.g if the materials haven’t been purchased and the
      character is a similar complexity, i will likely be fine to change the
      character). <br /> <br />
      If I have already begun work on the suit, changes to the design will
      likely be refused (things like eye colour change if I haven’t painted the
      eyes yet would probably be okay, but it would be very dependent on what
      stage we are at with the suit).
      <br /> <br />
      Any add-ons that haven’t been discussed prior to agreeing on a price will
      incur an additional fee. This goes for things like additional magnetic
      tongues or eyelids, sandals etc.
    </div>
    <BubbleTitle stretch small title="NSFW policy / additional zips" />
    <div className="text-copy">
      If you’d like me to install an SPH to your suit, I will be more than happy
      to do so. As with other add-ons, this will incur an additional fee beyond
      the base price. Once the suit is in your hands, you can use it as you
      wish! <br /> <br />
      If you’re interested in additional plush parts for your suit, I’m also
      able to do so for an extra fee - just enquire and we can discuss options.
    </div>
    <BubbleTitle stretch small title="Other" />
    <div className="text-copy">
      I will not take commissions from anybody under the age of 18, even with
      consent from parents. <br /> <br />
      Please note that I have a cat - those allergic should take this into
      consideration when commissioning me.
    </div>
  </div>
);

export default function Pricing() {
  return (
    <Section isHero={true}>
      <Text title="Terms of service" content={content} />
    </Section>
  );
}
